import React, { Component } from 'react';
import './Logo.css';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Modal from 'react-modal';

import creativePrimary from './images/creativePrimary.png';
import creativePrimaryBG from './images/creativePrimaryBG.png';
import creativeSecondary from './images/creativeSecondary.png';
import creativeSecondaryBG from './images/creativeSecondaryBG.png';
import entrepreneurialPrimary from './images/entrepreneurialPrimary.png';
import entrepreneurialPrimaryBG from './images/entrepreneurialPrimaryBG.png';
import entrepreneurialSecondary from './images/entrepreneurialSecondary.png';
import entrepreneurialSecondaryBG from './images/entrepreneurialSecondaryBG.png';
import technicalPrimary from './images/technicalPrimary.png';
import technicalPrimaryBG from './images/technicalPrimaryBG.png';
import technicalSecondary from './images/technicalSecondary.png';
import technicalSecondaryBG from './images/technicalSecondaryBG.png';

import ada from './images/ada.png';
import desc from './images/desc.png';

class Logo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responses: {
        values: [0, 1]
      },
      top: {
        foregroundColor: '#6CB8E7',
        backgroundColor: '',
        charm: 'entrepreneurialSecondary',
      },
      bottom: {
        foregroundColor: '#EC6271',
        backgroundColor: '',
        charm: 'technicalSecondary',
      },
      modalOpen: false
    }
  }

  componentDidMount() {
    let responses = JSON.parse(this.props.match.params['answers']);
    console.log(responses);
    // let primaryLocation = !!(Math.floor(Math.random() * 2)) ? 'top' : 'bottom';
    // let secondaryLocation = (primaryLocation == 'top') ? 'bottom' : 'top';
    let primaryLocation = 'top', secondaryLocation = 'bottom';
    let allColors = ['#F68352', '#A1C854', '#6CB8E7', '#95609F', '#EC6271'];
    let backgroundPositon = Math.round(Math.random());
    
    let tempState = this.state;
    tempState.responses = responses;

    switch(responses.primarySkill) {
      case 'Entrepreneurial':
        tempState[primaryLocation].charm = 'entrepreneurialPrimary';
        break;
      case 'Creative':
        tempState[primaryLocation].charm = 'creativePrimary';
        break;
      case 'Technical':
        tempState[primaryLocation].charm = 'technicalPrimary';
        break;
    }

    switch(responses.secondarySkill) {
      case 'Entrepreneurial':
        tempState[secondaryLocation].charm = 'entrepreneurialSecondary';
        break;
      case 'Creative':
        tempState[secondaryLocation].charm = 'creativeSecondary';
        break;
      case 'Technical':
        tempState[secondaryLocation].charm = 'technicalSecondary';
        break;
    }

    for(let i = 0; i < responses.values.length; i++) {
      let color;

      switch(responses['values'][i]) {
        case "Rigour":
          color = '#F68352';
          break;
        case "Curiosity":
          color = '#A1C854';
          break;
        case "Collaboration":
          color = '#6CB8E7'
          break;
        case "Creativity":
          color = '#95609F';
          break;
        case "Resilience":
          color = '#EC6271';
          break;
      }

      allColors.splice(allColors.indexOf(color), 1);
      tempState[!!i ? 'top': 'bottom'].foregroundColor = color;
    }

    tempState[!!backgroundPositon ? 'top' : 'bottom'].backgroundColor = allColors[Math.floor(Math.random()*allColors.length)];

    this.setState(tempState);
    console.log(this.state.responses);
  }
  
  openModal() {
    this.setState({
      modalOpen: true
    })
  }

  closeModal() {
    this.setState({
      modalOpen: false
    })
  }

  render() {
    let topCharm, bottomCharm, topCharmBG, bottomCharmBG;
    
    // Refactor this
    switch(this.state.top.charm) {
      case 'entrepreneurialPrimary':
        topCharm = entrepreneurialPrimary;
        topCharmBG = entrepreneurialPrimaryBG;
        break;
      case 'creativePrimary':
        topCharm = creativePrimary;
        topCharmBG = creativePrimaryBG;
        break;
      case 'technicalPrimary':
        topCharm = technicalPrimary;
        topCharmBG = technicalPrimaryBG;
        break;
      case 'entrepreneurialSecondary':
        topCharm = entrepreneurialSecondary;
        topCharmBG = entrepreneurialSecondaryBG;
        break;
      case 'creativeSecondary':
        topCharm = creativeSecondary;
        topCharmBG = creativeSecondaryBG;
        break;
      case 'technicalSecondary':
        topCharm = technicalSecondary;
        topCharmBG = technicalSecondaryBG;
        break;
    }
    
    switch(this.state.bottom.charm) {
      case 'entrepreneurialPrimary':
        bottomCharm = entrepreneurialPrimary;
        bottomCharmBG = entrepreneurialPrimaryBG;
        break;
      case 'creativePrimary':
        bottomCharm = creativePrimary;
        bottomCharmBG = creativePrimaryBG;
        break;
      case 'technicalPrimary':
        bottomCharm = technicalPrimary;
        bottomCharmBG = technicalPrimaryBG;
        break;
      case 'entrepreneurialSecondary':
        bottomCharm = entrepreneurialSecondary;
        bottomCharmBG = entrepreneurialSecondaryBG;
        break;
      case 'creativeSecondary':
        bottomCharm = creativeSecondary;
        bottomCharmBG = creativeSecondaryBG;
        break;
      case 'technicalSecondary':
        bottomCharm = technicalSecondary;
        bottomCharmBG = technicalSecondaryBG;
        break;
    }

    return (
      <div>
        <CSSTransitionGroup
        transitionName="example"
        transitionAppear={true}
        transitionAppearTimeout={700}
        transitionEnter={false}
        transitionLeave={false}
        >
          <div className='logoPage'>
            <div className='header'>
              <h1 className='title'>YOUR CURATED ADA LOGO:</h1>
            </div>
            <div className='content'>
              <div className='topWrapper'>
                <div className='logo'>
                  <div className='top'>
                    <img src={ada} />
                    <img style={{
                      backgroundColor: this.state.top.foregroundColor
                    }} className="topCharmBG" src={topCharmBG} />
                    <img style={{
                      backgroundColor: this.state.top.backgroundColor
                    }} className="topCharm" src={topCharm} />
                  </div>
                  <div className='bottom'>
                    <img style={{
                      backgroundColor: this.state.bottom.foregroundColor
                    }} className="bottomCharmBG" src={bottomCharmBG} />
                    <img style={{
                      backgroundColor: this.state.bottom.backgroundColor
                    }} className="bottomCharm" src={bottomCharm} />
                    <img src={desc} />
                  </div>
                </div>
                <div className='topTools'>
                  <div className='symbols'>
                
                  </div>
                  <div className='primaryColors'>

                  </div>
                  <div className='primaryBG'>

                  </div>
      
      
                </div>
              </div>
            </div>
            <div className='bottomTools'>
              <div className='symbols'>
                <img style={{backgroundColor: '#000000'}} src ={creativePrimary}/> 
                <img style={{backgroundColor: '#000000'}} src ={creativeSecondaryBG}/>
                <img style={{backgroundColor: '#000000'}} src ={technicalPrimaryBG}/>
                <img style={{backgroundColor: '#000000'}} src ={technicalSecondaryBG}/>
                <img style={{backgroundColor: '#000000'}} src ={entrepreneurialPrimary}/> 
                <img style={{backgroundColor: '#000000'}} src ={entrepreneurialSecondaryBG}/>
              </div>
              <div className='primaryColors'>
                <button style={{backgroundColor:  '#ec6271'}} type="button"></button>
                <button style={{backgroundColor:  '#95609f'}} type="button"></button>
                <button style={{backgroundColor:  '#6cb8e7'}} type="button"></button>
                <button style={{backgroundColor:  '#a1c854'}} type="button"></button>
                <button style={{backgroundColor:  '#f5e134'}} type="button"></button>
                <button style={{backgroundColor:  '#f68352'}} type="button"></button>
              </div>
              <div className='primaryBG'>
                <button style={{backgroundColor:  '#ec6271'}} type="button"></button>
                <button style={{backgroundColor:  '#95609f'}} type="button"></button>
                <button style={{backgroundColor:  '#6cb8e7'}} type="button"></button>
                <button style={{backgroundColor:  '#a1c854'}} type="button"></button>
                <button style={{backgroundColor:  '#f5e134'}} type="button"></button>
                <button style={{backgroundColor:  '#f68352'}} type="button"></button>
              </div>
              
            </div>
            <div className='buttons'>
              <Modal
                style={{
                  content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '0px',
                    border: 'none',
                    padding: '0'
                  },
                  overlay: {
                    backgroundColor: '#ddd'
                  }
                }}
                isOpen={this.state.modalOpen}
                closeTimeoutMS={500}
                onRequestClose={this.closeModal.bind(this)}
                contentLabel="Modal"
              >
                <div className='modalContent'>
                  <h1 className='logoTitle'>
                    Your Logo. Explained.
                  </h1>
                  <div className='logoExplain'>
                    <div className='explaination'>
                      <h3 className='desc'>You chose <b>{this.state.responses.primarySkill}</b> as your primary skill, which is represented by this charm:</h3>
                      <img style={{
                        backgroundColor: this.state.top.foregroundColor
                      }} className="topCharmBG" src={topCharmBG} />
                      <img style={{
                        backgroundColor: this.state.top.backgroundColor
                      }} className="topCharm" src={topCharm} />
                    </div>
                    <div className='explaination'>
                      <h3 className='desc'>You chose <b>{this.state.responses.secondarySkill}</b> as your secondary skill, which is represented by this charm:</h3>
                      <img style={{
                        backgroundColor: this.state.bottom.foregroundColor
                      }} className="topCharmBG" src={bottomCharmBG} />
                      <img style={{
                        backgroundColor: this.state.bottom.backgroundColor
                      }} className="topCharm" src={bottomCharm} />
                    </div>
                    <div className='explaination'>
                      <h3 className='desc'>You chose <b>{this.state.responses.values[0]}</b> as your first value that you identify with, which we represent with this colour:</h3>
                      <div className='colorBlock' style={{
                        backgroundColor: this.state.top.foregroundColor
                      }}></div>
                    </div>
                    <div className='explaination'>
                      <h3 className='desc'>You chose <b>{this.state.responses.values[1]}</b> as your second value that you identify with, which we represent with this colour:</h3>
                      <div className='colorBlock' style={{
                        backgroundColor: this.state.bottom.foregroundColor
                      }}></div>
                    </div>
                  </div>
                  <div className='button' onClick={this.closeModal.bind(this)}>Go Back</div>
                </div>
              </Modal>
              <div className='button' onClick={this.openModal.bind(this)}>Explain my Logo</div>
              <div className='button'>Download my Logo</div>
            </div>
          </div>
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default Logo;
