import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import './WorkSched.css';
import { TimeLine, Day } from './WorkSchedComponents';



class WorkSched extends Component {
            render() {
                let weekdayName = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
                
                return(
                    <div>
                        <div className='header'>
                        <h1>Schedule</h1>
                        </div>
                        <Container>
                            <Row>
                                <div className='timeline'><TimeLine /></div>
                    {weekdayName.map( (day, index) => <div key={index} className='data-class'><Day key={index} dayProp={day} /></div>)}
                            </Row>
                        </Container>
                    </div>
                );
        }
}
    
export { WorkSched }