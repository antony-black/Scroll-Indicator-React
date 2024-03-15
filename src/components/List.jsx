import "../index.scss";

export default function List({list}) {
  const createList = () => {
    return list.map(listItem => (
      <li key={listItem.id}>{listItem.title}</li>
    ));
  }

  return (
    <ul className="product-list">
    {
      createList()
    }
  </ul>
  )
}