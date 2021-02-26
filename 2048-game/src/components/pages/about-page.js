const AboutPage = () => {
  return (
    <div className="container about">
      <p>
        <strong>2048</strong> is an easy and fun puzzle game. Even if you don't
        love numbers you will love this game. It is played on 4x4, 5x5, 6x6
        grids using the arrows. Every time you press a key - all tiles slide.
        Tiles with the same value that bump into one-another are merged.
        Although there might be an optimal strategy to play, there is always
        some level of chance. If you beat the game and would like to master it,
        try to finish with a smaller score. That would mean that you finished
        with less moves.
      </p>
      <span className="font-weight-bold text-uppercase">How to play:</span>
      <p>
        Use your <span className="font-weight-bold">arrow keys</span> to move
        the tiles. When two tiles with the same number touch, they{" "}
        <strong>merge into one!</strong>
      </p>

      <h4 class="section-title">2048 Game Variations</h4>

      <p>
        Learn all about <em>2048</em>'s history on{" "}
        <a
          href="https://en.wikipedia.org/wiki/2048_(video_game)"
          target="_blank"
        >
          wikipedia
        </a>
        .<br />
      </p>
    </div>
  );
};

export default AboutPage;
