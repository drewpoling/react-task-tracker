const Leaderboard = () => {
  return (
    <div className="widget-container">
      <div style={{ margin: "0px 100px" }}>
        <h1
          style={{
            marginBottom: "20px",
            fontSize: "34px",
            textAlign: "center",
            color: "dodgerblue",
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
          margin: "30px auto 10px auto",
        }}
      >
        <div className="col" style={{ padding: "0px" }}>
          <h1
            style={{
              backgroundColor: "dodgerblue",
              color: "white",
              textAlign: "center",
              paddingBottom: "4px",
            }}
          >
            Top 100
          </h1>
        </div>
        <div className="col" style={{ padding: "0px" }}>
          <h1
            style={{
              color: "dodgerblue",
              textAlign: "center",
              border: "2px solid dodgerblue",
            }}
          >
            Friends
          </h1>
        </div>
      </div>

      <div
        className="col-10"
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "30px auto 10px auto",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Rank</h2>
        <h2 style={{ textAlign: "center" }}>Name</h2>
        <h2 style={{ textAlign: "center" }}>Score</h2>
      </div>

      <div></div>
    </div>
  );
};

export default Leaderboard;
