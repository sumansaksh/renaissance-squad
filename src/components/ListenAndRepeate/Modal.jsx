import { Button, Modal, TextInput } from "flowbite-react";
import { useState } from "react";

const ModalComponent = ({ setShowModal, showModal, sendMessages }) => {
  const [studentName, setStudentName] = useState("Vivek");
  const handleModalClose = (startMessage) => {
    // just set it without making any requests
    // setChatHistory([{ role: "system", content: startMessage }]);
    sendMessages([
      { role: "system", content: startMessage },
      { role: "user", content: "Please start the test" },
    ]);
    setShowModal(false);
  };
  const handleStartClick = () => {
    const startMessage = `

      
        You are an english proficiency examiner for engineering students. Conduct test for a student called Vivek. 

        You need to Assess the candidates comprehension & verbal level of English. 

        Once the test starts, speak a paragraph in English. 
        The paragraphs you ask should be short story that can be spoken in 20 seconds.

        Wait for the candidate to repeat the paragraph that they’ve just heard in their own words. The candidate is expected to re-phrase the paragraph.

        The question carries 10 marks. 

        Rubrics: 
        5 marks: comprehension & meaning
        5 marks: grammar & language

        If the candidate repeats the exact sentence as you, there's a 75% penalty on the marks. They are expected  
        penalize them for wrong grammar  
        penalize them for wrong comprehension  


        After paragraph, wait for the student's answer. 

        Provide feedback after student's answer.

        At the end of the test, provide output in the following json format in plain text. In the final feedback, never provide any additional text outside of this format {totalMarks: 30, marks: 25, feedback: <your feedback here.>}
            

          
    `;
    handleModalClose(startMessage);
  };

  return (
    <>
      <Modal show={showModal} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              <p>Lets start the test</p>
            </h3>
            <div className="flex justify-center gap-4">
              <Button onClick={handleStartClick}>
                <p>Start the test!</p>
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ModalComponent;
