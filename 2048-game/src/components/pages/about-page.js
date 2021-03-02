import React from "react";

const AboutPage = () => {
  return (
    <div className="container about">
      <p>
        <span className="font-weight-bold">2048</span> is an easy and fun puzzle
        game. Even if you don&apos;t love numbers you will love this game. It is
        played on 4x4, 5x5, 6x6 grids using the arrows. Every time you press a
        key - all tiles slide. Tiles with the same value that bump into
        one-another are merged. Although there might be an optimal strategy to
        play, there is always some level of chance. If you beat the game and
        would like to master it, try to finish with a smaller score. That would
        mean that you finished with less moves.
      </p>
      <p>
        This game is mobile compatible and you can play it on any device -
        iPhone, iPad or any other smartphone.
      </p>
      <span className="font-weight-bold text-uppercase">How to play:</span>
      <p>
        Use your <span className="font-weight-bold">arrow keys</span> to move
        the tiles. When two tiles with the same number touch, they{" "}
        <span className="font-weight-bold">merge into one!</span>
      </p>
      <p className="font-weight-bold">
        Here are some tips on how to play 2048 to achieve a higher score:
      </p>
      <p>
        Start by pushing the tiles to one corner of the square. Placing tiles
        together in one corner gives you a higher chance to move tiles with the
        same number closer together. You can use one of the four corners of the
        box, top left, top right, bottom left, and bottom right. The square at
        the edge of the corner you chose should contain the highest number so it
        won’t get in your way while you combine other tiles.
      </p>

      <p>
        Never place tiles with high numbers in the centre of the box. Doing so
        will make it harder for you to combine other tiles because your tile
        with a higher number on it will block other tiles with lower numbers
        that are appearing.
      </p>

      <p>
        Start with the tiles with small numbers on them. Let the tiles with high
        numbers on them stay in one corner while you are combining the tiles
        with smaller numbers. Then the score will increase as time passes by.
      </p>

      <p>
        Use the boxes that are seen beside the corner you are using to keep the
        tile with the highest number in order to make it easier to combine them
        together.
      </p>

      <p>
        Don’t rush in combining tiles with high values. This might scatter the
        tiles you are keeping aside and make it harder to combine a lot of
        tiles. Keep combining squares with small values until you reach your
        goal.
      </p>

      <p>
        Practice a lot. Experience is one of the greatest mentors one can have.
        Playing the game a lot will give you a lot of practice and it will allow
        you to develop different strategies for how to achieve high scores. Be
        patient and let your experience take you to greater achievements in
        game.
      </p>
      <p>
        Learn all about <em>2048</em>&apos;s history on{" "}
        <a
          href="https://en.wikipedia.org/wiki/2048_(video_game)"
          target="_blank"
          rel="noopener noreferrer"
        >
          wikipedia
        </a>
        .<br />
      </p>
    </div>
  );
};

export default AboutPage;
