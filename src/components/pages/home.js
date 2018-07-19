import React, { Component } from 'react';
import { RingLoader } from 'react-spinners';
import { connect } from 'react-redux';
import cookies from 'react-cookies';

import Workspace from '../workspace/workspace.js';
import Sidebar from '../sidebar/sidebar.js';

import * as api from '../../lib/api.js';
import * as actions from '../../store/actions/users.js';

import './home.css';

export class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      topics:{},
      assignment:{},
      singleTopic: {},
    }
    this.getAssignment = this.getAssignment.bind(this);
    this.assignmentExists = this.assignmentExists.bind(this);
    this.saveAssignment = this.saveAssignment.bind(this);
  }

  componentDidUpdate() {
    console.log("HOME__STATE__", this.state);
  }

  async componentWillMount(){
    
    let payload = {
      model: 'github'
    }

    let topics = await api.get(payload);
    this.setState({topics});
    this.props.loading(false);

    let token = cookies.load('Token'); 
    
    if (token) {
      let profile = await api.login(token);
      this.props.addUser(profile);
    }
  }

  async getAssignment(topic, assgn){
      
    this.props.loading(true);
      
    let gitPayload = {
      model: `github/${topic}.${assgn}`
    }
    
    let assignment = await api.get(gitPayload);

    this.setState({singleTopic: topic});
    this.setState({assignment});

    let assgnExists = this.assignmentExists();
    console.log({assgnExists});

    if (assgnExists) {
      // do nothing
    } else {
      let newAssignment = await this.saveAssignment();
      this.props.addAssignment(newAssignment);
    }

    this.props.loading(false);
    
  }
  async saveAssignment() {
    let endpoint = 'assignment';
    let body = {
      assignmentName: `${this.state.singleTopic}/${this.state.assignment.name}`,
      profileId: `${this.props.user._id}`,
    }
    let payload = {endpoint, body};
    let data = await api.post(payload);
    return data;
  }

  assignmentExists() {
    let assgnExists = this.props.user.assignments.filter(singleAssgn => {
      return singleAssgn.assignmentName === `${this.state.singleTopic}/${this.state.assignment.name}`;
    });
    return !!assgnExists.length;
  }

  render() {
    let topics = this.state.topics || {};
    if(this.props.loadingStatus===true){
      return (
        <div className='sweet-loading'>
          <RingLoader className="spinner" size={160} color={'#ff0000'} />
        </div>
      )};

    return (

      <React.Fragment>
      <div className="Home">
        <Sidebar loading={this.props.loading} topics={topics} getAssign={this.getAssignment}/>
        <Workspace singleTopic={this.state.singleTopic} assignment={this.state.assignment}/>
      </div>
      </React.Fragment>

    );

}
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToprops = (dispatch, getState) => ({
  addUser: payload => dispatch(actions.addUser(payload)),
  addAssignment: payload => dispatch(actions.addAssignment(payload)),
});

export default connect(mapStateToProps, mapDispatchToprops)(Home);