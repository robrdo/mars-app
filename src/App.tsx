import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import './App.css';
import { Timer } from './common';
import { TimerComponent } from './components/TimerComponent';
import rocket from './assets/images/rocket.png';
import hero from './assets/images/hero.png';


const cookies = new Cookies();

const initTimers: Timer[] = [
  { timerId: 'timer1', initTime: 360 },
  { timerId: 'timer2', initTime: 540 },
  { timerId: 'timer3', initTime: 900 },
]

const rocketCounts = initTimers.length
const expiredSet = new Set<string>()

//TODO go over the code, add id to timers
//fix text alignment

function App() {

  const [timers, setTimers] = useState([] as Timer[])

  useEffect(() => {
    setTimers(initTimers.map(x => {
      const value = Number(cookies.get(x.timerId))
      return {
        timerId: x.timerId,
        initTime: value && (!isNaN(value)) ? value : x.initTime
      }
    }))
    console.log(timers)
  }, [])

  const timerTimeoutHandler = (timerId: string) => {
    expiredSet.add(timerId)
    const rocketsLeft = rocketCounts - expiredSet.size
    alert(rocketsLeft > 0
      ? `You missed a whole rocket to mars! ${rocketsLeft} left`
      : 'Aya, you missed a last rocket to mars!')
  }

  const timerResetHandler = (timerId: string) => {
    expiredSet.delete(timerId)
  }

  return (
    <div className="main-container">
      <div className='main-row'>
        <img className='rocket-image wobble-animation' src={rocket} alt="image" />
      </div>
      <div className='main-row info-container'>
        <div className='text-container'>
          <h2 className='text-header'>Get your seat to Mars!</h2>
          <div className='text'>Earth is doomed, but don't worry! The last rocket is leaving for mars soon, so hurry up and book you flight!</div>
        </div>
        <img className='mars-image' src={hero} alt="image" />
      </div>
      <div className='main-row timers-holder'>
        {timers.map((timer, index) => {
          return (
            <div className='timer'>
              <TimerComponent
                key={index}
                {...timer}
                timerDefault={initTimers[index].initTime}
                notifyOnTimeout={timerTimeoutHandler}
                notifyOntimerReset={timerResetHandler}
              />
            </div>)
        })
        }
      </div>
    </div>
  );
}

export default App;
