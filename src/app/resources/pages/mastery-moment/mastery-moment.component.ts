import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasteryMomentService } from 'src/app/common/services/mastery-moment.service';
import sha256 from 'crypto-js/sha256';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';

@Component({
  selector: 'app-mastery-moment',
  templateUrl: './mastery-moment.component.html',
  styleUrls: ['./mastery-moment.component.css']
})
export class MasteryMomentComponent implements OnInit {
  value:string;
  currentIndex:number=0;
  @Output() refresh = new EventEmitter<string>();
  constructor(
    private masteryMomentService: MasteryMomentService,
    private route: ActivatedRoute
  ) { }
  topic_id:string;
  showConfidence=false;
  currentKey:string;
  question=null;
  total_correct=0;
  total_time=0;
  increase_percent=0;
  answersDiv=null;
  start_time=new Date();
  isCorrectString:string="Correct";
  isCorrectImg:string;
  currentActivity:any;
  currentValue:string;
  showIntro=0;
  timer:any;
  moment_id:string;
  masteryMoment:any;
  currentAnswer:any;
  @Input() topic:any;
  ngOnInit(): void {
    this.init();
  }

  init(){
    this.topic_id = this.route.snapshot.paramMap.get('id');
    this.masteryMomentService.createMasteryMoment(this.topic_id).subscribe(masteryMoment => {
      this.masteryMoment = masteryMoment.data;
      this.currentActivity=masteryMoment.data.activities[0];
      this.moment_id=masteryMoment.id;
    });
  }

  getSortedAnswers(answers){
    return answers.sort((a, b) => (a.position > b.position) ? 1 : -1);
  }

  signKey (msg:string, clientKey: string) {
    return hmacSHA256(msg, clientKey);
  }

  showQuestions(){
    this.showIntro=1;
    console.log("hello");
    this.timer=new Date();
    this.total_correct=0;
    this.start_time=new Date();
    this.question = document.getElementsByClassName("question"+this.currentIndex)[0];
    this.question.style.display="block";
  }

  onItemChange(key,value,answer){
    this.showConfidence=true;
    this.currentKey=key;
    this.currentValue=value;
    this.currentAnswer=answer;
  }

  submitAnswer(activity,confidence){
    this.currentActivity=activity;
    this.question.style.display="none";
    this.answersDiv = document.getElementsByClassName("mastery-answer")[0];
    this.answersDiv.style.display="block";
    if(activity.correctAnswer==this.signKey(this.currentKey,activity.key)){
      this.isCorrectImg='../assets/images/checkmark-outline.svg';
      this.isCorrectString="Correct";
      this.total_correct++;
    }
    else{
      this.isCorrectImg='../assets/images/incorrect-icon.svg';
      this.isCorrectString="Incorrect";
    }
    var t2 = new Date();
    var dif = ( t2.getTime() - this.timer.getTime() ) / 1000;
    console.log(dif)
    this.masteryMomentService.updateMasteryMoment(this.masteryMoment.id,activity.id,confidence,dif,this.currentAnswer.id).subscribe(data => {
       
    });
    

  }

  closeModal(){
    var gdprmasteryModal = document.getElementById("gdprmasteryModal");
      gdprmasteryModal.style.display="none";
      this.currentIndex=0;
      this.showConfidence=false;
      
      if(this.answersDiv)
        this.answersDiv.style.display="none";
      if(this.showIntro==2){
        this.refresh.emit("");
      }
      else{
        this.init();
      }
      this.showIntro=0;
  }

  showNextQuestion(){
    if(this.currentIndex==this.masteryMoment.activities.length-1){
      this.showIntro=2;
      this.currentIndex=0;
      this.timer=new Date();
      var t2 = new Date();
      this.total_time = ( t2.getTime() - this.start_time.getTime() ) / 1000;
      this.increase_percent=this.topic.topic_courses.topics.mastery_cycle_days/this.topic.topic_courses.topics.mastery_expiry_days*100;
      this.answersDiv.style.display="none";
      this.showConfidence=false;
      this.masteryMomentService.completeMasteryMoment(this.moment_id).subscribe(data => {
       
      });
    }
    else{
      this.currentIndex++;
      this.timer = new Date();
      this.answersDiv.style.display="none";
      this.question = document.getElementsByClassName("question"+this.currentIndex)[0];
      this.question.style.display="block";
      this.showConfidence=false;
    }
    
  } 



}
