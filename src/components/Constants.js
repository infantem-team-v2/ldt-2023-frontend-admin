import { useEffect, useState } from "react";
import api from "../services/api";
import { nanoid } from "nanoid";
import { Collapse } from "react-bootstrap";



const Constants = () => {

  const [constants, setConstants] = useState();
  const [fieldsCollapse, setFieldsCollapse] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fillFieldsCollapse();
  }, [constants]);

  const fetchData = async () => {
    try {
      const res = await api.get("account/constant");
      if (res.status >= 200 && res.status < 300) {
        setConstants(res.data);
        console.log(res.data)
      }
    } catch (err) {
      console.log(err)
    }
  };

  const handleCollapse = (field_name) => {
    setFieldsCollapse({ ...fieldsCollapse, [field_name]: !fieldsCollapse[field_name] });
  }

  const fillFieldsCollapse = () => {
    let fields = {};
    if (constants) {
      Object.entries(constants).map((element) => {
        fields[element[0]] = false;
      })
    }
    setFieldsCollapse(fields);
  };


  return (
    <>
      {constants ? <>
        <div className="container">
          <h1 className="text-center">Константы</h1>
          <div className="d-flex justify-content-between">
            <a href='https://metrics.ldt2023.infantem.tech/d/6bnfeorMz/service-metrics?orgId=1&refresh=10s'>
              <h2 className="h2">Ссылка на метрики  ➚ </h2>
            </a>
            <div className="card">
              <h2>Данные вашего аккаунта метрик</h2>
              <p>login: KlenoviySirop</p>
              <p>password: 8JK-qR5-eCh-u3y</p>
            </div>
          </div>

          {
            Object.entries(constants).map((element) => {
              return (
                <div className="container" key={nanoid()}>
                  <h2>{element[0]}</h2>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => handleCollapse(element[0])}
                  >{fieldsCollapse[element[0]] ? "Скрыть ⥣ " : "Показать ⥥"}</button>
                  <Collapse in={fieldsCollapse[element[0]] ? fieldsCollapse[element[0]] : false}>
                    <div className="div-collapsed-admin">
                      {Object.values(element[1]).map((inputs) => {
                        return (Object.entries(inputs).map((input) => {
                          return (
                            <>{
                              String(input[0]).includes("id") ? <></> :
                                <div className="row" key={nanoid()}>
                                  <div className="col-6">
                                    <p>{input[0]}</p>
                                  </div>
                                  <div className="col-6">
                                    <p>{input[1]}</p>
                                  </div>
                                </div>
                            }
                            </>

                          )
                        })
                        )
                      })
                      }
                    </div>
                  </Collapse>
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