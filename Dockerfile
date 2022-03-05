FROM node:latest

# Install dependencies
RUN apt-get update -qq \
  && apt-get install -qq --no-install-recommends \
    ca-certificates \
    apt-transport-https \
  && apt-get upgrade -qq

# Install chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && echo "deb https://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
  && apt-get update -qq \
  && apt-get install -qq --no-install-recommends \
    google-chrome-stable \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

