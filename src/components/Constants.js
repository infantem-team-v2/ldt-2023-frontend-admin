import { useEffect, useState } from "react";
import api from "../services/api";
import { nanoid } from "nanoid";
import { Collapse, Form } from "react-bootstrap";
import Swal from "sweetalert2";



const Constants = () => {

  const [constants, setConstants] = useState();
  const [fieldsCollapse, setFieldsCollapse] = useState();
  const [changingFieldName, setChangingFieldName] = useState();
  const [changingFieldValue, setChangingFieldValue] = useState();
  const [changingFieldCategory, setChangingFieldCategory] = useState();

  const [isLoaded, setIsLoaded] = useState(false);

  const categories = ["county_prices", "machine_prices", "mean_salaries", "other_needs", "patent_prices"]

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fillFieldsCollapse();
  }, [constants]);

  useEffect(() => {
    if (constants && fieldsCollapse) {
      setIsLoaded(true);
    }
  }, [constants, fieldsCollapse]);

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

  const handleSubmit = async () => {
    try {
      const category = constants[changingFieldCategory];
      const field = Object.values(category).find((element) => {
        return Object.keys(element).includes(changingFieldName);
      });
      if (field) {
        const res = await api.patch("account/constant", {
          elements: [{
            category: changingFieldCategory,
            name: changingFieldName,
            value: changingFieldValue,
          }]
        });
        if (res.status >= 200 && res.status < 300) {
          Swal.fire({
            icon: "success",
            title: "Успех",
            text: "Константа успешно изменена/добавлена",
          });
          fetchData();
          setChangingFieldName("");
          setChangingFieldValue("");
        } else {
          Swal.fire({
            icon: "error",
            title: "Ошибка",
            text: "Произошла ошибка при изменении константы",
          });
        }

      } else {
        const res = await api.post("account/constant", {
          elements: [{
            category: changingFieldCategory,
            name: changingFieldName,
            value: changingFieldValue,
          }]
        }
        );
        if (res.status >= 200 && res.status < 300) {
          Swal.fire({
            icon: "success",
            title: "Успех",
            text: "Константа успешно изменена/добавлена",
          });
          fetchData();
          setChangingFieldName("");
          setChangingFieldValue("");
        } else {
          Swal.fire({
            icon: "error",
            title: "Ошибка",
            text: "Произошла ошибка при изменении константы",
          });
        }
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Ошибка",
        text: "Произошла ошибка при изменении константы",
      });
    }

  }

  return (
    <>
      {isLoaded ? constants ? <>
        <div className="container" >

          <div className="d-flex justify-content-between">
            <a href='https://metrics.ldt2023.infantem.tech/d/6bnfeorMz/service-metrics?orgId=1&refresh=10s'
              target="_blank"
              rel="noreferrer"
            >
              <h2 className="h2">Ссылка на метрики  ➚ </h2>
            </a>
            <div className="card p-4">
              <h2>Данные вашего аккаунта метрик</h2>
              <p>login: KlenoviySirop</p>
              <p>password: 8JK-qR5-eCh-u3y</p>
            </div>
          </div>
          <h1 className="text-center">Константы</h1>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
          }}>
            {
              Object.entries(constants).map((element) => {
                return (
                  <div className="container" key={nanoid()}>
                    <h2>{element[0]}</h2>
                    <button
                      className="btn btn-primary mb-2"
                      type="button"
                      onClick={() => handleCollapse(element[0])}
                    >{fieldsCollapse[element[0]] ? "Скрыть ⥣ " : "Показать ⥥"}</button>
                    <Collapse in={fieldsCollapse[element[0]] ? fieldsCollapse[element[0]] : false}>
                      <div className="div-collapsed-admin">
                        {Object.values(element[1]).map((inputs) => {
                          return (
                            <div className="border-bottom">{Object.entries(inputs).map((input) => {
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
                            })}</div>
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
          <div className="card p-3 mb-4">
            <h2>Изменить константу</h2>
            <p className="text-mited">
              Введите название константы и новое значение,
              вы можете как изменить текущее значение константы,
              так и добавить новую константу.
            </p>
            <div className="row">
              <div className="col-4">
                <Form.Select
                  className="form-control"
                  onChange={(e) => setChangingFieldCategory(e.target.value)}
                >
                  {categories.map((category, index) => {
                    return (
                      <option value={category} key={index}>{category}</option>
                    )
                  })}
                </Form.Select>
              </div>
              <div className="col-4">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Название константы"
                  value={changingFieldName}
                  onChange={(e) => setChangingFieldName(e.target.value)}
                />
              </div>
              <div className="col-4">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Новое значение"
                  value={changingFieldValue}
                  onChange={(e) => setChangingFieldValue(e.target.value)}
                />
              </div>
            </div>
            <button
              className="btn btn-primary mt-2"
              type="button"
              onClick={handleSubmit}
            >Изменить</button>
          </div>
        </div>
      </> : <div className="alert alert-danger data m-3" role="alert">
        Произошла ошибка при загрузке результатов.
      </div> :
        // spinner
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }
    </>
  )
};

export default Constants;