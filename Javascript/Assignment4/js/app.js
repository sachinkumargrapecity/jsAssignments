arr = [
    {   'Question': 'Capital of India is?',
        'option1' : 'Kolkata',
        'option2' : 'Mumbai',
        'option3' : 'Delhi',
        'option4' : 'Chennai',
        'correctOption' : '3',
        'Score' : '1' ,
    },
    {   'Question': 'In which decade was the American Institute of Electrical Engineers (AIEE) founded?',
        'option1' : '1850s',
        'option2' : '1860s',
        'option3' : '1880s',
        'option4' : '1980s',
        'correctOption' : '3',
        'Score' : '1'
    },
    {   'Question': 'What is part of a database that holds only one type of information?',
        'option1' : 'Report',
        'option2' : 'Field',
        'option3' : 'Record',
        'option4' : 'File',
        'correctOption' : '2',
        'Score' : '1'
    },
    {   'Question': '\'.MOV\' extension refers usually to what kind of file?',
        'option1' : 'Audio',
        'option2' : 'Image',
        'option3' : 'Video',
        'option4' : 'Document',
        'correctOption' : '3',
        'Score' : '1'
    },
    {   'Question': 'What is x265?',
        'option1' : 'Camera Which Zooms to 265 times.',
        'option2' : 'Video encoding technique.',
        'option3' : 'None of these',
        'option4' : 'Screen Size',
        'correctOption' : '2',
        'Score' : '1'
    }
];

class nextPreviousQuestion{
    constructor(arr, answerSubmittedObject){
        this.currentQuestion = 0;
        this.arrOfQuestion = arr;
        this.answerSubmittedObject = answerSubmittedObject;
    }

     currentQuestionNumber(){
        return this.currentQuestion;
    }
     nextQuestion(){
        this.currentQuestion = (this.currentQuestion+1)%5;
        templateUpdate.updateTemplate(this.currentQuestion,this.arrOfQuestion);
        this.clearCorrectOrIncorrect();
        this.selectRadioButtonThatpreviouslySelected();
    }

     previousQuestion(){
        let previousQues = this.currentQuestion-1;
        if(previousQues<0) previousQues = this.currentQuestion = 4;
        else this.currentQuestion = previousQues;
        templateUpdate.updateTemplate(this.currentQuestion,this.arrOfQuestion);
        this.clearCorrectOrIncorrect();
        this.selectRadioButtonThatpreviouslySelected();
    }

    firstQuestion(){
        this.currentQuestion = 0;
        templateUpdate.updateTemplate(this.currentQuestion,this.arrOfQuestion);
        this.clearCorrectOrIncorrect();
        this.selectRadioButtonThatpreviouslySelected();
    }

    lastQuestion(){
        this.currentQuestion = this.arrOfQuestion.length-1;
        templateUpdate.updateTemplate(this.currentQuestion,this.arrOfQuestion);
        this.clearCorrectOrIncorrect()
        this.selectRadioButtonThatpreviouslySelected();
    }

    selectRadioButtonThatpreviouslySelected(){
        if(this.answerSubmittedObject.returnArrayAnswered()[this.currentQuestion][0] == 1){
            
            // we have to update the radio button
                let previousValue  = this.answerSubmittedObject.returnArrayAnswered()[this.currentQuestion][1];
            // get the element and select the required button
            document.forms['options']['answer'][previousValue-1].checked = true;
        }
    }
    clearCorrectOrIncorrect(){
        document.getElementById("isCorrectOrIncorrect").innerHTML = "";
    }
}

// this class is used to calculate the total score
class scoreCalculator {
    constructor(){this.Totalscore = 0; }

    static getScore(){
        return this.Totalscore;
    }

    

    static addScore(score){
        if(this.Totalscore == undefined)
            this.Totalscore = score;
        else
            this.Totalscore = Number(this.Totalscore) + Number(score);
        
    }

    
}


// update question template values
class templateUpdate  {
   static updateTemplate(questionId,arrOfQuestion){
        let dataToBeUpdated = arrOfQuestion[questionId];
        document.getElementById('showQuestion').innerHTML = dataToBeUpdated.Question;
        document.getElementById('option1').innerHTML = dataToBeUpdated.option1;
        document.getElementById('option2').innerHTML = dataToBeUpdated.option2;
        document.getElementById('option3').innerHTML = dataToBeUpdated.option3;
        document.getElementById('option4').innerHTML = dataToBeUpdated.option4;

        let elements = document.forms['options']['answer'];
        for(let i=0;i<elements.length;i++){
            elements[i].checked = false;
        }
    }
}

// call templateUpdate function updateTemplate once
templateUpdate.updateTemplate(0,arr);


// submitted form
class answerSubmittedActions {
    constructor(arr){
        this.alreadyAnswered = [
            [0,0],
            [0,0],
            [0,0],
            [0,0],
            [0,0]
        ];
        this.arrOfQuestion = arr;
        this.optionSelected = null;
        
    }

    returnArrayAnswered(){
        return this.alreadyAnswered;
    }
    isAlreadyAnswered(){
        
        if(this.alreadyAnswered[nextPreviousActions.currentQuestionNumber()][0] == 1)
          return true;
    }

   

    checkIfAnswerIsCorrect(){
       
        if(this.arrOfQuestion[nextPreviousActions.currentQuestionNumber()]['correctOption'] == this.optionSelected)
            {   
                this.alreadyAnswered[nextPreviousActions.currentQuestionNumber()][1] = this.optionSelected;
                scoreCalculator.addScore(this.arrOfQuestion[nextPreviousActions.currentQuestionNumber()]['Score']);
                return true;
            }
        else{
            return false;
        }
    }

    findTheOptionsSelected(){
        let formValue = document.forms['options']['answer'].value;
        if(formValue == ''){
            alert("Select any Option");
            return NaN;
        }
        // check if already answered
        if(!this.isAlreadyAnswered())
            return Number(formValue);
        else
            alert("Already Answered");
    }

    checkIfAllQuestionsAnswered(){
        let check = 0;
        for(let i=0;i<this.alreadyAnswered.length;i++){
            if(this.alreadyAnswered[i][0] == 0){
               return false;
            }
        }
        alert("You have answered All Question. Your Correct Questions were: " + scoreCalculator.getScore()
                + " And Incorrect Questions were :" + (this.arrOfQuestion.length-scoreCalculator.getScore())  );
        return true;
    }


    checkTheAnswer(){
        this.optionSelected = this.findTheOptionsSelected();
        this.alreadyAnswered[nextPreviousActions.currentQuestionNumber()][0] = 1;
        if(this.checkIfAllQuestionsAnswered()){
            return;
        }

        
            if(!isNaN(this.optionSelected)){
                
                if(this.checkIfAnswerIsCorrect()){
                    document.getElementById("isCorrectOrIncorrect").innerHTML = "Correct Answer";
                }
                else{
                    let correctAnswer = this.arrOfQuestion[nextPreviousActions.currentQuestionNumber()]['correctOption'];
                    document.getElementById("isCorrectOrIncorrect").innerHTML = "Wrong Answer, correct Answer was : " + correctAnswer;
                }
            }
    }



}


const answerSubmitted = new answerSubmittedActions(arr);
const nextPreviousActions = new nextPreviousQuestion(arr, answerSubmitted);