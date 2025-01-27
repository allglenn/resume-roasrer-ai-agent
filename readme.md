# Resume Roaster AI Agent 🚀

An intelligent web application that helps students craft better resumes through AI-powered feedback using DeepSeek's advanced language model.

## 🎯 Overview

Resume Roaster is a modern web application that leverages DeepSeek-R1 AI to analyze student resumes and provide actionable feedback. The application helps students improve their resumes by:

- Performing deep analysis of resume content and structure
- Providing detailed, constructive feedback in real-time
- Suggesting industry-specific keywords and improvements
- Identifying missing crucial information and experience gaps
- Offering professional formatting recommendations
- Comparing against industry best practices

## 🧠 AI Integration

- **Model**: DeepSeek-R1
- **Platform**: Together AI
- **Capabilities**:
  - Natural language understanding
  - Context-aware feedback
  - Professional writing suggestions
  - Industry-specific recommendations

## 🏗️ Tech Stack

### Frontend
- React.js with TypeScript
- Modern UI/UX design principles
- Real-time feedback interface
- Responsive design for all devices

### Backend
- FastAPI (Python)
- DeepSeek R1 AI integration
- RESTful API architecture
- CORS-enabled for secure communication

## 🚀 Getting Started

### Prerequisites
- Docker and Docker Compose installed on your machine
- Git for version control
- Together AI API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/allglenn/resume-roasrer-ai-agent.git
cd resume-roasrer-ai-agent
```

2. Launch with Docker Compose
```bash
docker-compose up --build
```

3. Access the application
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## 🛠️ Development

### Frontend Development
The React frontend is located in the `ui` directory. To start development:

```bash
cd ui
npm install
npm start
```

### Backend Development
The FastAPI backend is located in the `api` directory. To start development:

```bash
cd api
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## 📁 Project Structure
```
project-root/
├── ui/                   # Frontend React application
│   ├── src/             # Source code
│   ├── public/          # Static files
│   ├── package.json     # Dependencies
│   ├── tsconfig.json    # TypeScript configuration
│   └── Dockerfile       # Frontend container configuration
├── api/                 # Backend FastAPI application
│   ├── app/            # Application code
│   ├── requirements.txt # Python dependencies
│   └── Dockerfile      # Backend container configuration
└── docker-compose.yml   # Container orchestration
```

## 🔒 Environment Variables

Create a `.env` file in the project root:

```env
REACT_APP_API_URL=http://localhost:8000
TOGETHER_AI_API_KEY=your_together_ai_key
DEEPSEEK_MODEL_ID=deepseek-r1
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- DeepSeek for their powerful R1 language model
- Together AI for model hosting and API
- Resume parsing libraries
- UI/UX design inspiration from modern web applications

## 📧 Contact

Glenn Allogho - Tech Innovator & Software Engineer

- 🌐 [Personal Website](https://glenn.allinsoftware.io/)
- 📧 [glennfreelance365@gmail.com](mailto:glennfreelance365@gmail.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/glenn-allogho-94649688/)
- 📝 [Medium](https://medium.com/@glennlenormand)
- 🐦 [Twitter](https://x.com/glenn_all)
- 💻 [GitHub](https://github.com/allglenn)

Project Link: [https://github.com/allglenn/resume-roasrer-ai-agent](https://github.com/allglenn/resume-roasrer-ai-agent)

---
Made with ❤️ by [Glenn Allogho](https://glenn.allinsoftware.io/) for people looking to enhance their career opportunities

