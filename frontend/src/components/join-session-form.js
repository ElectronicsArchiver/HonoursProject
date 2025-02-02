import './../styles/components/search.css'
import { Form, Button } from 'reactstrap'
import { Component } from 'react'
import axios from 'axios';
import Cookies from 'universal-cookie';

class JoinSessionForm extends Component {
    constructor(props) {
        super(props);
        this.state  = {
            sessions_list: [],
            value: '',
            redirect: false,
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.refresh_list();
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        // alert('A code was submitted: ' + this.state.value);

        this.refresh_list();
        console.log(this.state.sessions_list)

        let valid_code = this.state.sessions_list.find(obj => {
            return obj.join_code === this.state.value;
          })

        if (valid_code){
            const cookies = new Cookies();
            cookies.set('session_code', this.state.value, {path: '/'})

            // this.state.redirect = true;
            this.setState(this.state.redirect, true)
        } else {
            alert("Uh oh, " + this.state.value + " is not a valid session code!")
        }

        event.preventDefault();
    }

    refresh_list = () => {
        axios 
        .get("/api/sessions")
        .then((res) => this.setState({ sessions_list: res.data }))
        .catch((err) => console.log(err)); 
    };

    render(){
        return(
            <Form onSubmit={this.handleSubmit} action="/waiting">
                <label htmlFor="session-search">
                    <span className="visually-hidden">Join a session</span>
                </label>
                <input
                    type="text"
                    id="session-search"
                    value={this.state.value}
                    onChange={this.handleChange}
                    placeholder="Enter your session code here"
                />
                <Button color="primary" type="submit">Join</Button>
            </Form>
        )
    }
}

export default JoinSessionForm;