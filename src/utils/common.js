function isMobile(){
  const userAgent = navigator.userAgent
  const isMobile = /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(userAgent);
  const isSmallScreen = window.innerWidth <= 768;
  return isMobile || isSmallScreen;
}