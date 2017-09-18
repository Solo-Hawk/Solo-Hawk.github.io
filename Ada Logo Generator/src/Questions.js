import React, { Component } from 'react';
import './Questions.css';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

const order = ['primarySkill', 'secondarySkill', 'values'];

class PrimarySkill extends Component {
  render() {
    return (
      <div className="questions">
        <div className='header'>
          <h1 className='title'>Primary Skill</h1>
          <h3 className='subtitle'>What is your strongest skill?</h3>
        </div>
        <div className='buttons'>
          <div className='button' onClick={() => this.props.nextQuestion('Technical')}>Technical</div>
          <div className='button' onClick={() => this.props.nextQuestion('Creative')}>Creative</div>
          <div className='button' onClick={() => this.props.nextQuestion('Entrepreneurial')}>Entrepreneurial</div>
        </div>
      </div>
    )
  }
}

class SecondarySkill extends Component {
  render() {
    return (
      <div className="questions">
        <div className='header'>
          <h1 className='title'>Secondary Skill</h1>
          <h3 className='subtitle'>What about your second strongest skill?</h3>
        </div>
        <div className='buttons'>
          <div className='button' onClick={() => this.props.nextQuestion('Technical')}>Technical</div>
          <div className='button' onClick={() => this.props.nextQuestion('Creative')}>Creative</div>
          <div className='button' onClick={() => this.props.nextQuestion('Entrepreneurial')}>Entrepreneurial</div>
        </div>
      </div>
    )
  }
}

class Values extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: []
    }
  }

  valueSelected(value) {
    let tempState = this.state;

    if(tempState.selected.indexOf(value) > -1) {
      tempState.selected.splice(tempState.selected.indexOf(value));  
      document.getElementById('value' + value).classList.remove('selectedValue');      
      return;
    }

    if(tempState.selected.length === 2) {
      document.getElementById('value' + tempState.selected[0]).classList.remove('selectedValue');      
      tempState.selected.splice(0, 1);
    }

    tempState.selected.push(value);
    document.getElementById('value' + value).classList.add('selectedValue');
  }

  generateLogo() {
    if(this.state.selected.length < 2) {
      return;
    }
    this.props.nextQuestion(this.state.selected);
  }

  render() {
    return (
      <div className="questions">
        <div className='header'>
          <h1 className='title'>Values</h1>
          <h3 className='subtitle'>Which two ADA Values do you identify with?</h3>
        </div>
        <div className='buttons'>
          <div className='button' id='valueRigour' onClick={this.valueSelected.bind(this, 'Rigour')}>Rigour</div>
          <div className='button' id='valueResilience' onClick={this.valueSelected.bind(this, 'Resilience')}>Resilience</div>
          <div className='button' id='valueCollaboration' onClick={this.valueSelected.bind(this, 'Collaboration')}>Collaboration</div>
          <div className='button' id='valueCuriosity' onClick={this.valueSelected.bind(this, 'Curiosity')}>Curiosity</div>
          <div className='button' id='valueCreativity' onClick={this.valueSelected.bind(this, 'Creativity')}>Creativity</div>
        </div>
        <div className='buttons'>
          <div className='button' onClick={this.generateLogo.bind(this)}>Generate Logo</div>
        </div>
      </div>
    )
  }
}

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: null,
      data: {
        primarySkill: null,
        secondarySkill: null,
        values: null
      }
    }
  }

  componentDidMount() {
    this.setState({
      current: 'primarySkill'
    })
  }

  nextQuestion(answer) {
    let tempState = this.state;
    let tempCurrent = this.state.current;

    tempState.data[tempState.current] = answer;
    tempState.current = null;

    this.setState(tempState);

    setTimeout(() => {
      this.setState({
        current: order[order.indexOf(tempCurrent) + 1]
      })
      if(!this.state.current) {
        window.location = '/logo/' + JSON.stringify(this.state.data);
      }
    }, 800);
  }

  render() {
    let currentQuestion;

    switch(this.state.current) {
      case 'primarySkill':
        currentQuestion = <PrimarySkill nextQuestion={this.nextQuestion.bind(this)} />;
        break;
      case 'secondarySkill':
        currentQuestion = <SecondarySkill nextQuestion={this.nextQuestion.bind(this)} />;
        break;
      case 'values':
        currentQuestion = <Values nextQuestion={this.nextQuestion.bind(this)} />;
        break;
      default:
        break;
    }

    return (
      <div>
        <CSSTransitionGroup
        transitionName="example"
        transitionLeaveTimeout={700}
        transitionEnterTimeout={700}
        >
          {this.state.current ? currentQuestion : null}
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default Questions;
