const imgElList = document.querySelectorAll('img');

const lazyLoad = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        entry.target.src = entries.target.dataset.src;
        observer.unobserve(entry.target);
      }
    });
  });

  imgElList.forEach((img) => {
    observer.observe(img);
  });
};

// <img data-src="" />
