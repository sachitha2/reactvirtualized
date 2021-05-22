import React,{useState,useEffect} from 'react';
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized';
import faker from 'faker';
import './app.css';
function App() {
  const [people,setPeole] = useState([]);
  const [time, setTime] = useState(new Date())
  const cache = React.useRef(new CellMeasurerCache({
    fixedWidth:true,
    defaultHeight:100,

  }));

  useEffect(()=>{
    setPeole(
      [...Array(50).keys()].map(key => {
        return{
          id:key,
          name:`${faker.name.firstName()} ${faker.name.lastName()}`,
          bio:faker.lorem.lines(Math.random() * 100)
        }
      })
    )
    
  },[])


  useEffect(()=>{
    const interval = setInterval(()=>{
      setTime(new Date())
    },1000)
    return ()=>clearInterval(interval);
  },[])
  return (
    <div>
      
      <div style={{width:"calc(100% - 40px)",height:"calc(100vh - 40px)",backgroundColor:"#333E5F",color:"#fff",margin:"10px",padding:"10px",borderRadius:"10px"}}>
        <AutoSizer>
          {
            ({width,height})=>(
              <List
            width={width}
            height={height}
            rowHeight={cache.current.rowHeight}
            deferredMeasurementCache={cache.current}
            rowCount={people.length}
            rowRenderer={({key,index,style,parent})=>{
              const person = people[index];
              return (
                <CellMeasurer  key={key} cache={cache.current} parent={parent} columnIndex={0} rowIndex={index}>
                    <div style={style} className="hello">
                      <h1>{person.name}</h1>
                      <p>{JSON.stringify(style)}</p>
                    </div>
                </CellMeasurer>
                    
                  )
            }}
          />
            )
          }
        </AutoSizer>
      </div>
      {/* <ul>
        {people.map(person => <li key={person.id}>
          <h2>{person.name}</h2>
        </li>)}
      </ul> */}
    </div>
  );
}

export default App;
