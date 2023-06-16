export const ErrorPage = () => {
  const reloadPage = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  return (
    <div>
      <p>Произошла непредвиденная ошибка</p>
      <button type="button" onClick={reloadPage}>Обновить страницу</button>
    </div>
  );
};
