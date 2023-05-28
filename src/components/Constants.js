import { useEffect, useState } from "react";
import api from "../services/api";
import { nanoid } from "nanoid";



const Constants = () => {

  const [constants, setConstants] = useState();
  const [fields, setFields] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get("account/constant");
      if (res.status >= 200 && res.status < 300) {
        setConstants(res.data);
      }
    } catch (err) {
      console.log(err)
    }
  };


  return (
    <>
      {constants ? <>
        <div className="container">
          <h1 className="text-center">Константы</h1>
          {
            Object.entries(constants).map((element) => {
              return (
                <div className="container" key={nanoid()}>
                  <h2>{element[0]}</h2>
                  {Object.entries(element[1]).map((inputs) => {
                    return (
                      <div className="row" key={nanoid()}>
                        <div className="col-6">
                          <h3>{inputs[0]}</h3>
                        </div>
                        <div className="col-6">
                          <h3>{inputs[1]}</h3>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })
          }
        </div>
      </> : <div className="alert alert-danger data m-3" role="alert">
        Произошла ошибка при загрузке результатов.
      </div>}
    </>
  )
};

export default Constants;