import Score from "./Score";

const Scores = ({ scores }) => {
  const alternatingColor = ["white", "whitesmoke"];

  const ScoresTable = scores.map((score, index) => {
    return (
      <Score
        color={alternatingColor[index % alternatingColor.length]}
        key={index}
        score={score}
      />
    );
  });
  return (
    <>
      <div className="leaderboard-container">
        <div className="col" style={{ margin: "60px auto 30px auto" }}>
          <h1
            style={{
              margin: "auto auto 30px auto",
              fontSize: "2.8rem",
              textAlign: "center",
              color: "Black",
              fontWeight: "500",
            }}
          >
            High Scores
          </h1>
        </div>

        <div
          className="col-8"
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "30px auto 0px auto",
            paddingTop: "5px",
            color: "black",
            borderTop: "1px solid gainsboro",
            borderBottom: "1px solid gainsboro",
          }}
        >
          <h4
            style={{
              margin: "5px 0px",
              fontSize: "2rem",
              textAlign: "center",
            }}
          >
            rank
          </h4>
          <h4
            style={{
              margin: "5px 0px",
              fontSize: "2rem",
              textAlign: "center",
            }}
          >
            name
          </h4>
          <h4
            style={{
              margin: "5px 0px",
              fontSize: "2rem",
              textAlign: "center",
            }}
          >
            score
          </h4>
        </div>

        <div
          className="col-8"
          style={{
            overflowX: "hidden",
            overflowY: "auto",
            height: "460px",
            padding: "0px",
            display: "flex",
            justifyContent: "space-between",
            margin: "0px auto 110px auto",
            flexDirection: "column",
            textTransform: "uppercase",
          }}
        >
          {ScoresTable}
        </div>
      </div>
    </>
  );
};

export default Scores;
