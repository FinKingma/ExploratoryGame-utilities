FROM cloudgear/ruby:2.2

ENV APP_HOME=/home/app/pact_broker

RUN mkdir -p $APP_HOME

ADD . $APP_HOME/
RUN cd $APP_HOME

WORKDIR $APP_HOME
RUN bundle

EXPOSE 8080
CMD ["bundle", "exec", "rackup", "-o","0.0.0.0", "-p", "8080"]