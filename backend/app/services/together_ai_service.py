from typing import Optional
import together
from app.core.config import settings
import json

class TogetherAIService:
    def __init__(self):
        # Initialize the API key
        together.api_key = settings.TOGETHER_API_KEY
        self.model = "deepseek-ai/DeepSeek-R1"

    async def analyze_resume(self, resume_content: str, career_interests: Optional[str] = None) -> dict:
        """
        Analyze resume using DeepSeek model via Together AI
        """
        try:
            # Construct the prompt
            prompt = self._construct_prompt(resume_content, career_interests)

            # Add system prompt to the actual prompt
            system_prompt = "You are an expert resume reviewer with years of experience in HR and recruitment. Provide detailed, constructive feedback on resumes."
            full_prompt = f"{system_prompt}\n\n{prompt}"

            # Call the API
            response = together.Completion.create(
                prompt=full_prompt,
                model=self.model,
                max_tokens=2048,
                temperature=0.7,
                top_p=0.9,
                top_k=50,
                repetition_penalty=1.0,
                stop=['</s>']
            )

            # Parse and structure the response
            # The response format has changed in the new version
            if hasattr(response, 'output'):
                text = response.output.choices[0].text
            else:
                text = response.choices[0].text

            analysis = self._parse_response(text)
            return analysis

        except Exception as e:
            raise Exception(f"Error calling Together AI API: {str(e)}")

    def _construct_prompt(self, resume_content: str, career_interests: Optional[str] = None) -> str:
        """
        Construct the prompt for the AI model
        """
        base_prompt = f"""Please analyze this resume and provide detailed feedback in the following format:

Resume Content:
{resume_content}

Please provide your analysis in JSON format with the following structure:
{{
    "summary": "Brief overview of the resume",
    "strengths": ["List of key strengths"],
    "weaknesses": ["Areas for improvement"],
    "recommendations": ["Specific recommendations"],
    "keywords_missing": ["Important keywords that should be added"],
    "formatting_suggestions": ["Suggestions for better formatting"],
    "impact_score": "Score out of 10",
    "detailed_feedback": {{
        "experience": "Feedback on experience section",
        "education": "Feedback on education section",
        "skills": "Feedback on skills section"
    }}
}}"""

        if career_interests:
            base_prompt += f"\n\nCareer Interests/Goals:\n{career_interests}\nPlease tailor the feedback considering these career interests."

        return base_prompt

    def _parse_response(self, response_text: str) -> dict:
        """
        Parse and validate the AI response
        """
        try:
            # Find the JSON part of the response
            start_idx = response_text.find('{')
            end_idx = response_text.rfind('}') + 1
            if start_idx == -1 or end_idx == 0:
                raise json.JSONDecodeError("No JSON found in response", response_text, 0)
            json_str = response_text[start_idx:end_idx]
            
            # Parse JSON
            analysis = json.loads(json_str)
            
            # Ensure all required fields are present
            required_fields = [
                "summary", "strengths", "weaknesses", "recommendations",
                "keywords_missing", "formatting_suggestions", "impact_score",
                "detailed_feedback"
            ]
            
            for field in required_fields:
                if field not in analysis:
                    analysis[field] = []
                    
            return analysis

        except json.JSONDecodeError:
            # If JSON parsing fails, return a structured error response
            return {
                "error": "Failed to parse AI response",
                "raw_response": response_text
            } 