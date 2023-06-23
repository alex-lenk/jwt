import { Link } from 'react-router-dom';
import { Create, DeleteForever } from '@mui/icons-material';

const Main = () => {
  return <>
    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
      <h4 className="mb-sm-0 font-size-18">Пользователи</h4>

      <div className="page-title-right">
        <button className="btn btn-primary btn-sm">+ Добавить</button>
      </div>
    </div>

    <div className="card">
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Отель</th>
              <th>ФИО</th>
              <th>Телефон</th>
              <th>Действия</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>1</td>
              <td>admin@alexiank.ru</td>
              <td>Home office of plaza de muerto</td>
              <td>Александр Васильевич Янк</td>
              <td>+7 999 080-15-57</td>
              <td width="100">
                <div className="btn-group">
                  <Link to="/control/user?id=1" className="btn btn-primary btn-md">
                    <Create/>
                  </Link>
                  <button className="btn btn-danger btn-md">
                    <DeleteForever/>
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>admin@alexiank.ru</td>
              <td>Home office of plaza de muerto</td>
              <td>Александр Васильевич Янк</td>
              <td>+7 999 080-15-57</td>
              <td width="100">
                <div className="btn-group">
                  <Link to="/control/user?id=1" className="btn btn-primary btn-md">
                    <Create/>
                  </Link>
                  <button className="btn btn-danger btn-md">
                    <DeleteForever/>
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>admin@alexiank.ru</td>
              <td>Home office of plaza de muerto</td>
              <td>Александр Васильевич Янк</td>
              <td>+7 999 080-15-57</td>
              <td width="100">
                <div className="btn-group">
                  <Link to="/control/user?id=1" className="btn btn-primary btn-md">
                    <Create/>
                  </Link>
                  <button className="btn btn-danger btn-md">
                    <DeleteForever/>
                  </button>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>;
};

export default Main;
