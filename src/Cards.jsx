import React from "react";

const Cards = ({ data }) => {
  console.log("data", data);
  return (
    <section className="cards">
      {data.length > 1 ? (
        <>
          {data.map((item) => {
            const { brand, id, price, rating, stock, thumbnail, title,images } = item;

            return (
              <div className="card" key={id}>
                <section className="card">
                  <img src={images[2]} alt="" />
                </section>

                <section className="content">
                  <div className="price">
                    <h2>{brand}</h2>

                    <h3>{price}</h3>
                  </div>

                  <div className="rating">
                    <h3>{rating}</h3>
                    <h3>{stock}</h3>
                  </div>
                </section>

                <h3 className="price title">{title}</h3>
              </div>
            );
          })}
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </section>
  );
};

export default Cards;
