import { AiFillStar } from "react-icons/ai";

const Score = ({ score, color }) => {
  //adds leading zeros
  function padLeadingZeros(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  return (
    <div style={{ backgroundColor: color }}>
      <div
        class="score-container"
        style={score.rank === 1 ? { color: "dodgerblue" } : {}}
      >
        <h4
          style={{
            margin: "5px 0px",
            fontSize: "2rem",
            padding: "0px 15px",
          }}
        >
          {padLeadingZeros(score.rank, 3)}{" "}
        </h4>

        <h4
          style={
            score.rank === 1
              ? {
                  margin: "5px 0px",
                  fontSize: "2rem",
                  padding: "0px 0px 0px 10px",
                }
              : {
                  margin: "5px 0px",
                  fontSize: "2rem",
                  padding: "0px 14px 0px 0px",
                }
          }
        >
          {score.username}
        </h4>
        <h4
          style={{ margin: "5px 0px", fontSize: "2rem", padding: "0px 15px" }}
        >
          {score.rank === 1 ? (
            <AiFillStar
              size={18}
              style={{ color: "gold", margin: "0px 7px 0px 0px" }}
            />
          ) : null}
          {padLeadingZeros(score.score, 3)}
        </h4>
      </div>
    </div>
  );
};

export default Score;
