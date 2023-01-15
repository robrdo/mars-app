import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import './App.css';
import hero from './assets/images/hero.png';
import rocket from './assets/images/rocket.png';
import { Timer } from './common';
import { TimerComponent } from './components/TimerComponent';


const cookies = new Cookies();

const initTimers: Timer[] = [
  { timerId: 'timer1', initTime: 360 },
  { timerId: 'timer2', initTime: 180 },
  { timerId: 'timer3', initTime: 500 },
]



const rocketCounts = initTimers.length
const expiredSet = new Set<string>()

function App() {

  const [timers, setTimers] = useState([] as Timer[])

  useEffect(() => {
    const timers = initTimers.map(x => {
      const value = Number(cookies.get(x.timerId))
      return {
        timerId: x.timerId,
        initTime: !isNaN(value) ? chooseInitValue(value, x.initTime) : x.initTime
      }
    })

    for (const timer of timers) {
      if (timer.initTime === 0) {
        expiredSet.add(timer.timerId)
      }
    }
    setTimers(timers)

  }, [])

  //for dev purpose, if we changed inittime to lower value 
  //on rebuild we may see the highest number than we expected because of cookies
  const chooseInitValue = (value: number, initvalue: number): number => {
    return value > initvalue ? initvalue : value
  }

  const timerTimeoutHandler = (timerId: string) => {
    if (expiredSet.has(timerId)) {
      return
    }

    expiredSet.add(timerId)
    const rocketsLeft = rocketCounts - expiredSet.size
    alert(rocketsLeft > 0
      ? `You missed a whole rocket to mars! ${rocketsLeft} left`
      : 'Aya, you missed the last rocket to mars!')
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
          <h1 className='text-header'>Get your seat to Mars!</h1>
          <div className='text-paragraph'>Earth is doomed, but don't worry! The last rocket is leaving for mars soon, so hurry up and book you flight!</div>
        </div>
        <img className='mars-image' src={hero} alt="image" />
      </div>
      <div className='main-row timers-holder'>
        {timers.map((timer, index) => {
          return (
            <div className='timer' key={timer.timerId}>
              <TimerComponent
                rocketId={index + 1}
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
