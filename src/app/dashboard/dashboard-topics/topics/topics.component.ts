import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicService } from 'src/app/common/services/topic.service';
import { UserService } from 'src/app/common/services/user.service';
import { NamedTupleMember } from 'typescript';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['../../../app.component.css']
})
export class TopicsComponent implements OnInit {
  public isCollapsed = false;
  agree: boolean = false;
  topic_id:string;
  topics:any;
  stepname:number;
  nextTaskText:string;
  nextTaskButton:string;
  html:string;
  mastery_due:any;
  last_update_date:string;
  signed:boolean=true;
  lastCompletedText:string;
  data: any =
  [
    {
      "parentName": "How will the guidance help me?",
      "childProperties":
        [
          { "propertyName": "Our aim is to develop, guide and coach; in order to improve driver safety culture. The guidance provides 15 core provisions that each business should include and expand upon in their own driving for work policies/procedures and safe practices. It is the responsibility of senior management, those with supervisory/management roles and those who are assigned fleet safety responsibilities within each business to understand the content of, and to implement, the actions in this guidance document, as appropriate." },
        ]
    },
    {
      "parentName": "How will this guidance help us comply with the policy?",
      "childProperties":
      [
        { "propertyName": " <div class='content mt-2'>This guidance supports us in complying with our Group Driving for Work Policy by:<ul class='order-list-style-topics'><li>Raising awareness of and encouraging participation in driver safety management</li><li>Ensuring our businesses comply with all relevant road safety laws</li><li>Developing consistency in key aspects of driver safety across the Group</li><li>Implementing appropriate monitoring of the driver safety aspects of our activities and, where possible, preventing and reducing road safety incidents</li><li>Communicating our driver safety objectives and targets</li><li>Communicating progress with results against driver safety targets</li><li>Enhancing our driver safety performance</li> </ul>We can also ensure continued compliance with the applicable legal requirements by the following: <ul><li>Those responsible for driver safety or fleet management within their business familiarising themselves with road safety/traffic laws and employee safety laws (those which pertain to driver safety and/or risk assessment) that apply in that jurisdiction, the appropriate Road Safety Authorities and available best practice.</li><li>Each business self-assessing its compliance with this legislation and identifying any areas for improvement. Any areas for improvement identified should be prioritised and a local action plan should be put in place.</li></ul>    </div>" },
      ]
    },
    {
      "parentName": "Different jurisdictions have different traffic laws, so what are the core features that apply to all?",
      "childProperties":
      [
        { "propertyName": "When we drive for work, we are all responsible for our own safety, and for the vehicle we are driving. We are also responsible for our own driving performance. <br/>We’ve mentioned that each business is required to have its own local Driving for Work management processes which are specific to its own jurisdictional road safety/traffic and employee safety laws. <br/>.Within each local management process, the following core provisions are included. These are our 15 driver safety cogs – collectively driving us to drive safely:" },
      ]
    },
    {
      "parentName": "Personal safety and lone working",
      "childProperties":
      [
        { "propertyName": "When employees are driving for business, they may be working on their own. It is important we all understand the risks associated with lone working. In particular, we all should have guidance on: <ui class='order-list-style-topics'><li>Journey planning</li><li>Ensuring that colleagues are aware of travel plans</li><li>Emergency arrangements/contact details</li><li>What to do if employee feels unwell </li><li>What to do in the event of an incident</li> <li>If you are not aware of this guidance, please speak to your line manager.</li></ui>"},
       ]
    },
    {
      "parentName": "Journey planning",
      "childProperties":
      [
        { "propertyName": "Journey planning involves:<ul> <li>Building sufficient travel time into daily plans (within speed limits) especially if you are not familiar with the area, this is to avoid rushing to appointments when driving </li><li>Planning for adverse weather conditions </li><li>Planning for known traffic disruptions </li><li>Using satellite navigations systems/maps (if provided)</li><li>Planning your day so that the number of working/driving hours is not exceeded, which could lead to driver fatigue and breach of ‘working time’ laws </li><li>Driving in an economical/fuel efficient way </li><li>Using electric vehicle charge points - e.g., to ensure safety, park close to the point to avoid creating a trip hazard for pedestrians from trailing cables before or after use. Display a warning sign if possible.</li></ul>"},
       ]
    },
    {
      "parentName": "Seatbelts",
      "childProperties":
      [
        { "propertyName": "Wear seat belts at all times when travelling on business. We should also all check that passengers are wearing their seat belts."},
       ]
    },
    {
      "parentName": "Alcohol or substances that could impair driving",
      "childProperties":
      [
        { "propertyName": "The consumption of alcohol and recreational drugs shortly before driving is strictly prohibited. The Group expects all employees to comply with local drink/drug-driving legislation at all times. Committing a drink/drugs driving offence within working hours will lead to disciplinary action."},
       ]
    },
    {
      "parentName": "Medical fitness to drive",
      "childProperties":
      [
        { "propertyName": "<div>If required to take medication (for example, prescription or over the counter drugs) which may affects one’s ability to drive, special guidance should be provided. In particular, employees driving for work should be advised to seek advice from their doctor as to whether those drugs will affect the ability to drive safely.</div><div>Employees who are required to drive for work must be fit to work and this includes having the legally acceptable eyesight level. Local driver safety management processes should refer to local arrangements that have been put in place, e.g., regarding the provision of regular eye tests, drivers may be requested to provide a copy of a recent eye test before they commence driving for the business and/or at any time when requested after that. Drivers should also wear corrective prescription eyewear (if required) at all times when driving.</div>"},
       ]
    },
    {
      "parentName": "Driver fatigue",
      "childProperties":
      [
        { "propertyName": "<div>This is especially applicable to those who drive for business on a daily basis. Adequate journey planning and adherence to working time laws (proactive) will minimise driver fatigue, but guidance should also be provided about when fatigue is likely to happen and the measures that can be taken to avoid this. See your local processes for this.</div>"},
       ]
    },
    {
      "parentName": "Vehicle checks",
      "childProperties":
      [
        { "propertyName": "Regular vehicle checks should be carried out, especially before the start of each journey. We all must know how to operate a vehicle before driving it for the first time."},
       ]
    },
    {
      "parentName": "Rules of the road",
      "childProperties":
      [
        { "propertyName": "<div>All employees driving for business must comply with local road safety/traffic laws. Failure to do so may result in prosecution, or loss of driver’s licence, which could affect employment. It is considered a serious disciplinary matter.</div><div>Never drive faster than that speed limit, or faster than conditions safely allow (which may be slower than posted speed limits). Exceeding speed limits and ‘dangerous driving’ is against the law.</div><div>Be observant for vulnerable personnel on the road, including pedestrians, the elderly, disabled, cyclists or people on horseback and must allow sufficient space for all road users to travel safely. If you are driving a motorcycle or riding a bike, wear the required clothing including protective headgear; high-vis clothing and/or accessories as appropriate.</div>"},
       ]
    },
    {
      "parentName": "Incident reporting",
      "childProperties":
      [
        { "propertyName": "<div>Incident reporting arrangements will vary from business to business. Make sure you know what your arrangements are.</div><div>All incidents to a driver and/or company vehicle should be reported immediately to the appropriate person in the business. It is likely that an incident form will also need to be completed post incident. This information should then be used by the business to:</div><ul><li>Inform the motor/auto insurer (if appropriate)</li><li>Inform the Group</li><li>Inform the fleet provider (if appropriate)</li><li>Assess driver behaviour </li><li>Measure driver performance and trends </li></ul><div>If incidents are not reported in good time, this can lead to an increase in insurance charges and vehicle repair costs which drivers should be made aware of.</div>"},
       ]
    },
    {
      "parentName": "Driver risk assessment",
      "childProperties":
      [
        { "propertyName": "<div>All businesses within the Group are responsible to complete risk assessments that cover driving for work. Driver risk assessments should be brought to the attention of all drivers. Risk assessments can include a variety of factors, for example:</div><ul><li>Review of driver incidents, especially avoidable incidents</li><li>Review of driver adherence to reading of driver safety policies</li></ul><div>‘High risk’ drivers should be required to undertake training (e.g., risk awareness) and/or take any other steps the business considers necessary to reduce the risk, where a risk assessment indicates that they may present an unacceptable level of risk to their own health and safety or to that of others.</div><div>Whether using a company vehicle driver or a non-company vehicle driver (whose role requires driving), if a person gains penalty points on their licence, or if their driving causes concern to the business in any way, they may be required to undertake driver training.</div><div>Company vehicles may be withdrawn at the company’s discretion from employees who attain a certain level of penalty points (to be determined in each local policy), or from employees whose driving or medical conditions cause the company concern.</div><div>Company vehicles can be withdrawn from employees who are disqualified from driving.<div><div>It should be a condition of employment that drivers co-operate fully with any action required by the business to avoid or reduce the level of unacceptable risk that they present as a driver. Failure to do may require the business to take disciplinary action. Where driving is a requirement, safe driving is a vital element of each individual’s effective performance of their role, and a vital element of their responsibility in respect of health and safety obligations. Some parts of the business outsource the risk assessment to a third party who can review the driver, the journey and the vehicle.</div>"},
       ]
    },
    {
      "parentName": "Driver training",
      "childProperties":
      [
        { "propertyName": "<div>Based on driver risk assessments, those who drive for work will be provided with important safety information which should be recorded. Training may include:</div><ul><li>Reading of local driver safety policies/procedures/handbooks</li><li>Reviewing of driver safety training video(s)</li><li>Reading of the company vehicle manual and understanding how the vehicle operates</li><li>Other more detailed training, based on risk</li></ul><div>High risk drivers may be required to undertake additional training to improve their driving behaviour. This can be outsourced to a third party and may include in-vehicle or classroom based training, or e-learning programmes.</div><div>Training outcomes are recorded in order to update the risk profile for the drivers involved.</div>"},
       ]
    }
    ,
    {
      "parentName": "Driver licenses and documents",
      "childProperties":
      [
        { "propertyName": "<div>Based on driver safety risk assessments and the extent of/nature of driving for work, each business must arrange, as appropriate, accurate and current records of driver and vehicle documentation, for example:</div><ul><li>Appropriate valid driving licences and driving experience</li><li>Appropriate valid driving licences and driving experience</li></ul><div>If vehicles are leased, the lease company should provide evidence of vehicle status as part of their contract.</div><div>Based on driver risk assessments and/or where required by fleet car management processes or local jurisdictional requirements, driving licences may be checked on commencement of employment with periodic rechecks thereafter, these checks must be recorded.</div><div>If changes to a licence occur, in particular the imposition of new conditions, endorsements and/or penalty points from motoring offences, company car drivers or those who drive regularly for work are obligated to inform the business immediately. Failure to do so will result in disciplinary procedures. This could also have an impact on the company's insurance premium. This information may also need to be sent to local driver/vehicle Licencing Authorities. It may be necessary to consider asking drivers to consent to such Authorities providing details of their driving licence to the business (as a condition of employment), if/as appropriate.</div><div>Drivers may be considered higher risk if they have had changes to their licences. They may need to undergo driver training or vehicles may be withdrawn at the company’s discretion from employees who attain a certain level of penalty points (to be determined in each local policy).</div>"},
       ]
    },
    {
      "parentName": "Additional Drivers",
      "childProperties":
      [
        { "propertyName": "<div>Most fleet motor insurance policies within the business cover the vehicles but cover is provided for drivers driving on the policy holder’s permission. Some businesses allow each company vehicle driver to nominate one additional driver for their vehicle (this may be at a cost). If this arrangement is in place, the business should ensure that the additional driver also holds a valid driving licence.</div>"},
       ]
    }
    ,
    {
      "parentName": "Car rental and driving abroad",
      "childProperties":
      [
        { "propertyName": "<div>If you are driving in another country, please be mindful of the following guidance:</div><ul><li>Do not drive directly after a long haul flight</li><li>There are documents to bring and recommended checks to make before you travel, including:<ul><li>Valid driving licence</li><li>International Driving Permit (when necessary)</li><li>Their vehicle's registration documents</li><li>Motor insurance information </li><li>Using equipment, e.g. snow chains</li></ul></li><li>You should understand how to access the road safety/traffic laws in other countries (including suggested apps).</li></ul><div>Company vehicles may be taken abroad but this must be subject to the prior written consent of the leasing company and motor insurers. Refer to travel policies and guidance for information on the requirements while travelling on business</div>"},
       ]
    }
  ];


  data1: any =
  [
    {
      "parentName": "How will this policy help me?",
      "childProperties":
        [
          { "propertyName": "The safety of our employees and those that work with us is paramount. The aim of this policy is first and foremost to protect our drivers. We do this by meeting our legal, best practice, and duty of care obligations to our employees and those working on our behalf." },
        ]
    },
    {
      "parentName": "Who does this policy apply to?",
      "childProperties":
        [
          { "propertyName": "<div>This Driving for Work Policy applies to: <ul><li>All of our businesses and subsidiaries, and</li><li>Any Group employee, contingent worker or contractor who drives any mode of transport on Group related business. That is: whether driving a personal, rented, company/fleet or client vehicle; or a motorcycle or bicycle. It applies whether the person is driving occasionally or regularly for work.</li></ul> Remember that Driving for Work is always defined in accordance with local, jurisdictional definitions. </div> " },
        ]
    },
    {
      "parentName": "What is the role of The Group?",
      "childProperties":
        [
          { "propertyName": "<div>The Group functions help keep drivers safe by: <ul><li>benchmarking, communicating, and providing training materials on driver safety best practice </li><li>collating and reporting driver safety data from across the Group</li><li>advising on the operationalization of this policy within our businesses, and</li><li>monitoring and testing to ensure The Group’s businesses have implemented this policy and additional driver safety measures as and where required.</li></ul> </div>" },
        ]
    },
    {
      "parentName": "What about individual businesses and management?",
      "childProperties":
        [
          { "propertyName": "<div> Our business leaders and those responsible for our drivers shall:<ul> <li>facilitate and support Driving for Work processes  </li> <li>ensure Driving for Work risk assessments are performed and incorporate:</li> <ul> <li>drivers who receive a car allowance</li> <li>occasional drivers, and </li> <li>the use of personal vehicles for work purposes</li> </ul> <li>establish that their business’s controls are aligned to the driving risks that have been identified</li> <li>periodically review and consider Driving for Work metrics, and </li> <li>ensure all of their business’s drivers are sufficiently trained in Driving for Work requirements.</li> </ul>  </div>" },
        ]
    },
    {
      "parentName": "And my role?",
      "childProperties":
        [
          { "propertyName": "<div>All Group employees Driving for Work for any business purpose need to: <ul> <li>have a valid driving licence  </li> <li>use a taxed, roadworthy vehicle that is insured for work purposes,</li>  <li>drive safely</li> <li>be familiar with this policy and other Driving for Work measures </li> <li>complete your required Driving for Work training, and</li> <li>immediately report any incidents while Driving for Work.</li></ul>We must never drive while under the influence of drugs, certain medications, or alcohol; while using a handheld device; when fatigued, with limited or impaired eyesight; or when overly reliant on driver assistance technology (such as sat-navs).  </div>" },
        ]
    }
  ];
  
  constructor(
    public topicService:TopicService,
    public userService:UserService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer:DomSanitizer,
    ) { }

  ngOnInit(): void {
    this.init();
  }
  init(){
    this.topic_id = this.route.snapshot.paramMap.get('id');
    this.topicService.getTopic(this.topic_id).subscribe(topics => {
      this.topics=topics.data;
      this.mastery_due=topics.masterydue;
      this.html=this.topics.topic_courses.topics.description_html;
      this.refreshLayout();
      

    });
  }
  getContentText(child){
    //console.log(child);
    return this.sanitizer.bypassSecurityTrustHtml(child);
    //console.log( this.sanitizer.bypassSecurityTrustHtml(child)+"hello");
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
    var scrolledY = window.scrollY;

    if(scrolledY){
      window.scroll(0, scrolledY - 280);
    }
  }

  takeAction(el: HTMLElement){
    if(this.topics.policy_doc_complete!='Complete'){
      this.scroll(el);
    }
    if(this.topics.policy_doc_complete=='Complete' && this.topics.formal_training_complete!='Complete'){
      window.open(this.topics.topic_courses.courses.training_deeplink, '_blank').focus();
    }
    if(this.topics.policy_doc_complete=='Complete' && this.topics.formal_training_complete=='Complete'){
      var gdprmasteryModal = document.getElementById("gdprmasteryModal");
      gdprmasteryModal.style.display="block";
    }

  }

  getMasteryPercent(topics){
    if(topics.mastery_percent==100){
      return 97;
    }
    else{
      return topics.mastery_percent;
    }
  }

  toggleAccordian(data,event, index) {
    var element = event.target;
    if(!element.id.startsWith("accordion")){
      element=event.target.parentElement;
    }
    element.classList.toggle("active");
    if(data[index].isActive) {
      data[index].isActive = false;
    } else {
      data[index].isActive = true;
    }      
    var panel = element.nextElementSibling;
    
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
}

markComplete(){
  this.topicService.updatePolicyDocument(this.topics.id).subscribe(data => {
    this.last_update_date=data.updated_at;
    this.signed=true;
    this.topics.policy_doc_complete='Complete';
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear().toString();
    this.topics.policy_doc_completion_date=dd+'.'+mm+'.'+yyyy;
    
    this.topicService.clearCache();
    this.refreshLayout();
  });
}

refreshLayout() {
  if(this.topics.policy_doc_complete!='Complete'){
    this.nextTaskText='Review and accept the Policy Document for the '+this.topics.topic_courses.topics.topic_name+' topic.';
    this.nextTaskButton='Accept Policy Document';
    this.stepname=0;
    this.signed=false;
  }
  if(this.topics.policy_doc_complete=='Complete' && this.topics.formal_training_complete!='Complete'){
    this.nextTaskText='Open and complete your Formal Training module.';
    this.lastCompletedText="Policy Document signed on "+this.topics.policy_doc_completion_date+". On to the next task!"
    this.stepname=1;
    this.nextTaskButton='Complete Formal Training';
  }
  if(this.topics.policy_doc_complete=='Complete' && this.topics.formal_training_complete=='Complete'){
    this.nextTaskText='Check in daily to keep your GDPR Mastery at a compliant level.';
    this.lastCompletedText="Formal Training taken on the "+this.topics.formal_training_completion_date;
    this.nextTaskButton='Practise Mastery';
    this.stepname=2;
  }
  
}

downloadPDF(){
  window.open("assets/resources/2022 03 Driver Safety Policy Guidance document_update_03.03.2022_EN.pdf", '_blank').focus();
}
openCourse(){
  window.open(this.topics.topic_courses.courses.training_deeplink, '_blank').focus();
}

refresh($event){
  this.init();
  this.topicService.clearCache();
  this.userService.clearCache();
  //this.userService.getCurrent();
  //window.location.reload();
}

}


