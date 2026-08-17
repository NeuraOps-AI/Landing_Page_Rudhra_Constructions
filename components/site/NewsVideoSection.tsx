const videoId = "RNLhggqyleM";
const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

export function NewsVideoSection() {
  return (
    <section id="news-media" className="news-video-section" aria-labelledby="news-video-title">
      <div className="news-video-inner">
        <header className="news-video-heading">
          <div>
            <p>News &amp; Blog</p>
            <h1 id="news-video-title">Stories that shape the spaces we build.</h1>
          </div>
          <a href={videoUrl} target="_blank" rel="noreferrer" aria-label="Watch this video on YouTube in a new tab">
            Visit YouTube <span aria-hidden="true">↗</span>
          </a>
        </header>

        <article className="news-video-card">
          <div className="news-video-frame">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
              title="Rudhra Constructions featured video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="news-video-copy">
            <p>Featured Video</p>
            <h3>Inside Rudhra Constructions</h3>
            <span>Discover the thinking, craftsmanship and purpose behind the spaces we create.</span>
          </div>
        </article>
      </div>
    </section>
  );
}
