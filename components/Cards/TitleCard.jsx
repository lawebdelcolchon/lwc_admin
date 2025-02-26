import Subtitle from "../Typography/Subtitle"

  
  function TitleCard({title, children, topMargin, TopSideButtons}){
      return(
          <div className={"card w-full p-4 bg-base-100 shadow-xl " + (topMargin || "mt-2")}>

            {/* Title for Card */}
              <Subtitle styleClass={TopSideButtons ? "inline-block" : ""}>
                {title}

                {/* Top side button, show only if present */}
                {
                    TopSideButtons && <div className="inline-block float-left">{TopSideButtons}</div>
                }
              </Subtitle>
              
              {/** Card Body */}
              <div className='h-full w-full bg-base-100'>
                  {children}
              </div>
          </div>
          
      )
  }
  
  
  export default TitleCard