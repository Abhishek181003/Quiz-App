import React, { useState } from 'react';

// Sample quiz questions
const quizQuestions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correct: 2
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct: 1
  },
  {
    id: 3,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correct: 3
  },
  {
    id: 4,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
    correct: 1
  },
  {
    id: 5,
    question: "What is the smallest country in the world?",
    options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
    correct: 1
  }
];

export default function App() {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);

  const navigate = (path) => {
    setCurrentRoute(path);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setScore(0);
  };

  const startQuiz = () => {
    resetQuiz();
    navigate('quiz');
  };

  const handleAnswer = (answerIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setUserAnswers(newAnswers);

    // Calculate score
    let newScore = 0;
    newAnswers.forEach((answer, index) => {
      if (answer === quizQuestions[index].correct) {
        newScore++;
      }
    });
    setScore(newScore);
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate('result');
    }
  };

  // Home Component
  const HomePage = () => (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '30px',
        padding: '40px',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          fontSize: '40px'
        }}>
          🧠
        </div>
        
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: 'white',
          margin: '0 0 10px 0'
        }}>
          QuizMaster
        </h1>
        
        <p style={{
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '18px',
          marginBottom: '30px'
        }}>
          Test your knowledge with our interactive quiz!
        </p>
        
        <div style={{ marginBottom: '30px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '10px'
          }}>
            <span style={{ marginRight: '8px' }}>⏱️</span>
            <span>5 Questions</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255, 255, 255, 0.9)'
          }}>
            <span style={{ marginRight: '8px' }}>🏆</span>
            <span>Multiple Choice</span>
          </div>
        </div>

        <button 
          onClick={startQuiz}
          style={{
            width: '100%',
            background: 'linear-gradient(45deg, #4ecdc4, #44a08d)',
            color: 'white',
            fontWeight: 'bold',
            padding: '16px 32px',
            borderRadius: '20px',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          Start Quiz →
        </button>
      </div>
    </div>
  );

  // Quiz Component
  const QuizPage = () => {
    const question = quizQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '30px' }}>
          {/* Header */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '24px',
            marginBottom: '24px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <h2 style={{ color: 'white', fontWeight: 'bold', margin: 0 }}>
                Question {currentQuestion + 1} of {quizQuestions.length}
              </h2>
              <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>
                {Math.round(progress)}% Complete
              </div>
            </div>
            
            {/* Progress Bar */}
            <div style={{
              width: '100%',
              height: '8px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${progress}%`,
                height: '100%',
                background: 'linear-gradient(45deg, #4ecdc4, #44a08d)',
                transition: 'width 0.5s ease'
              }}></div>
            </div>
          </div>

          {/* Question Card */}
          <div style={{
            background: 'white',
            borderRadius: '30px',
            padding: '40px',
            marginBottom: '24px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '30px',
              lineHeight: '1.4'
            }}>
              {question.question}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  style={{
                    width: '100%',
                    padding: '16px',
                    textAlign: 'left',
                    borderRadius: '20px',
                    border: userAnswers[currentQuestion] === index 
                      ? '2px solid #3b82f6' 
                      : '2px solid #e5e7eb',
                    background: userAnswers[currentQuestion] === index 
                      ? '#eff6ff' 
                      : 'white',
                    color: userAnswers[currentQuestion] === index 
                      ? '#1d4ed8' 
                      : '#333',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '16px',
                    fontWeight: '500'
                  }}
                  onMouseOver={(e) => {
                    if (userAnswers[currentQuestion] !== index) {
                      e.target.style.borderColor = '#93c5fd';
                      e.target.style.background = '#f8fafc';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (userAnswers[currentQuestion] !== index) {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.background = 'white';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      border: userAnswers[currentQuestion] === index 
                        ? '2px solid #3b82f6' 
                        : '2px solid #d1d5db',
                      background: userAnswers[currentQuestion] === index 
                        ? '#3b82f6' 
                        : 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '12px'
                    }}>
                      {userAnswers[currentQuestion] === index && (
                        <span style={{ color: 'white', fontSize: '12px' }}>✓</span>
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={nextQuestion}
              disabled={userAnswers[currentQuestion] === undefined}
              style={{
                padding: '16px 32px',
                borderRadius: '20px',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                border: 'none',
                fontSize: '16px',
                cursor: userAnswers[currentQuestion] !== undefined ? 'pointer' : 'not-allowed',
                background: userAnswers[currentQuestion] !== undefined
                  ? 'linear-gradient(45deg, #4ecdc4, #44a08d)'
                  : '#d1d5db',
                color: userAnswers[currentQuestion] !== undefined ? 'white' : '#9ca3af',
                boxShadow: userAnswers[currentQuestion] !== undefined 
                  ? '0 10px 20px rgba(0, 0, 0, 0.2)' 
                  : 'none'
              }}
              onMouseOver={(e) => {
                if (userAnswers[currentQuestion] !== undefined) {
                  e.target.style.transform = 'scale(1.05)';
                }
              }}
              onMouseOut={(e) => {
                if (userAnswers[currentQuestion] !== undefined) {
                  e.target.style.transform = 'scale(1)';
                }
              }}
            >
              {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'} →
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Result Component
  const ResultPage = () => {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    
    const getScoreMessage = () => {
      if (percentage >= 80) return { message: "Excellent!", color: "#059669", emoji: "🎉" };
      if (percentage >= 60) return { message: "Good Job!", color: "#2563eb", emoji: "👍" };
      if (percentage >= 40) return { message: "Not Bad!", color: "#d97706", emoji: "😊" };
      return { message: "Keep Trying!", color: "#dc2626", emoji: "💪" };
    };

    const scoreInfo = getScoreMessage();

    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '30px',
          padding: '40px',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ marginBottom: '30px' }}>
            <div style={{
              width: '96px',
              height: '96px',
              background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              fontSize: '48px',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)'
            }}>
              🏆
            </div>
            <h2 style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#333',
              margin: '0 0 8px 0'
            }}>
              Quiz Complete!
            </h2>
            <p style={{ color: '#666', fontSize: '16px', margin: 0 }}>
              Here's how you performed
            </p>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <div style={{
              fontSize: '72px',
              fontWeight: 'bold',
              marginBottom: '8px',
              background: 'linear-gradient(45deg, #8b5cf6, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {percentage}%
            </div>
            <div style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '16px',
              color: scoreInfo.color
            }}>
              {scoreInfo.emoji} {scoreInfo.message}
            </div>
            <div style={{ color: '#666', fontSize: '16px' }}>
              You got <span style={{ fontWeight: 'bold', color: '#333' }}>{score}</span> out of{' '}
              <span style={{ fontWeight: 'bold', color: '#333' }}>{quizQuestions.length}</span> questions correct
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button
              onClick={startQuiz}
              style={{
                width: '100%',
                background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
                color: 'white',
                fontWeight: 'bold',
                padding: '16px 24px',
                borderRadius: '20px',
                border: 'none',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)'
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('home')}
              style={{
                width: '100%',
                background: '#f3f4f6',
                color: '#374151',
                fontWeight: 'bold',
                padding: '16px 24px',
                borderRadius: '20px',
                border: 'none',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#e5e7eb';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = '#f3f4f6';
                e.target.style.transform = 'scale(1)';
              }}
            >
              🏠 Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Route rendering
  switch (currentRoute) {
    case 'home':
      return <HomePage />;
    case 'quiz':
      return <QuizPage />;
    case 'result':
      return <ResultPage />;
    default:
      return <HomePage />;
  }
}