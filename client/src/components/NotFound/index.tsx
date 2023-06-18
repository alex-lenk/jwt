import  { useEffect } from 'react';
import { Link } from 'react-router-dom';

// @ts-ignore
import cls from './notfound.module.scss';

const NotFound = () => {
  useEffect(() => {
    document.title = 'Страница не найдена - 404 ошибка';
  }, []);

  return (
    <div className="page__content container">
      <section className={ cls.notfound }>
        <div className={ cls.notfound_wrap }>
          <div className={ cls.notfound_error }>404</div>

          <h1 className={ cls.notfound_title }>Страница не&nbsp;найдена</h1>

          <Link to="/" className="btn__primary btn">На главную</Link>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
