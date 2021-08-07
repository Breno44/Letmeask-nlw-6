import { useParams, useHistory } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
// import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import '../styles/room.css';
import { database } from '../services/firebase';

type RoomParams = {
    id: string;
}

export function AdminRoom() {
    // const { user } = useAuth();
    const history = useHistory();
    const params = useParams<RoomParams>();


    const roomId = params.id;

    const { title, questions } = useRoom(roomId)

    async function handleEndRoom() {
        database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })

        history.push('/'); 
    }

    async function handleDeleteQuestion(questionId: string) {
       if(window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
       }
    }
    async function handleCheckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswer: true, 
        });
    }
    async function hnadleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true, 
        });
    }
    

    return(
        <div id="page-room">
            <header>
                 <div className="content">
                      <img src={logoImg} alt="letmeask " />
                      <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined onClick={handleEndRoom}>Encerrar a sala</Button>
                      </div>
                 </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>
                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question 
                                key={question.id}
                                content = {question.content}
                                author = {question.author}
                                isAnswer = {question.isAnswer}
                                isHighlighted = {question.isHighlighted}
                            >
                                {!question.isAnswer && (
                                    <>
                                      <button
                                          type="button"
                                          onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                      >
                                          <img src={checkImg} alt="Marcar Pergunta como respondida" />
                                      </button>
      
                                      <button
                                          type="button"
                                          onClick={() => hnadleHighlightQuestion(question.id)}
                                      >
                                          <img src={answerImg} alt="Dar destaque a pergunta" />
                                      </button>
                                    </>  
                                )}

                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover Pergunta" />
                                </button>
                            </Question>
                        )
                    })}
                </div>
            </main>
        </div>
    );
}