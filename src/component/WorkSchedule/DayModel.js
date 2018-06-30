import React, { Component } from 'react';
import { data }   from '../../data/Data_WorkSceh';
import { Modals } from '../Modals/ModalWork';
import { ListGroupItem } from 'reactstrap';
import { defaultBlockHeight, fillerBlockHeight } from '../../data/style_vars'

class ColumnRender extends Component {

    getOffset(obj) {
        let timeDiff;
        let timeArray;
        let startLocation;
        let inter = obj.reduce((offsetArray, item, index ) => {
                        timeArray = item.time.split('-', 2).map(index => index.split(':', 2));
                        timeDiff = (timeArray[1][0]*60 - timeArray[0][0]*60) + (timeArray[1][1] - timeArray[0][1]);
                        timeDiff *= (100/60);
                        startLocation = (timeArray[0][0]*100) + (timeArray[0][1]*(100/60)) - 900;
                        offsetArray[index] = {};
                        offsetArray[index].tag = item.tag;
                        offsetArray[index].start = startLocation;
                        offsetArray[index].height = timeDiff;
                        offsetArray[index].text = item.text;
                        offsetArray[index].time = item.time;
                        return offsetArray
                    }, []).sort((a, b) => a.start - b.start);
        return inter;
    }

    rendererFunc(daySchedule) {
        let buffer = this.getOffset(daySchedule);
        let blockHeight;
        let topToDown = [];
        let i = 0;
        let j = 0;
                
        for(var traverse = 0; traverse <= 900; traverse +=25) {
            topToDown.push(traverse);
            if(buffer[i].start === traverse ) {
                traverse += buffer[i].height - 25;
                if(i < buffer.length - 1){
                  i++;
                }
            }
        }
        i = 0;
        console.log(topToDown);
        return (topToDown.map((item, index) => {
            if(item === buffer[i].start) {
                if (i < buffer.length - 1) { 
                    i+=1;
                }
                if (j < buffer.length) { 
                    j+=1;
                }
                return (
                  <Modals data={buffer[j-1]} key={item} />
                );
            }

            if((i > 0) &&
               (item === (buffer[j-1].start + buffer[j-1].height)) &&
               (item%50 !== 0)) {
                return (
                        <ListGroupItem style={fillerBlockHeight} key={item}></ListGroupItem>
               );
            }

            if(item%50 === 0) {
                if(topToDown[index+1] === buffer[i].start) {
                    blockHeight = fillerBlockHeight;
                }
                else {
                    blockHeight = defaultBlockHeight;
                }
                return (
                        <ListGroupItem style={blockHeight} key={item}></ListGroupItem>
                );
            }
            return null;
        })
        );
    }
<<<<<<< HEAD
    
    Schedule() {
        return this.rendererFunc(data[this.props.index])
    }
    
    
    render() {
        return(<div>
               {this.Schedule()}</div>
                );
=======

    render() {
        return (
              <div>
                {this.rendererFunc(data[this.props.index])}
               </div>
              );
>>>>>>> d163478df8f25f616a4ec3c791d4aad8262ba4ba
    }
}

export { ColumnRender }
