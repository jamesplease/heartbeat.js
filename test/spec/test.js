describe('Instantiating a new heartbeat', function() {

  var heartbeat;

  beforeEach(function() {

    hearbeat = new Heartbeat({
      async: true
    });

  });

  afterEach(function() {
    heartbeat.stop();
  });

  it( 'should execute the heartbeat with the given context', function() {
    expect( stub ).to.have.been.calledOnce;
    expect( stub ).to.have.been.calledWithExactly( eventName+':'+channelName, true, 200, 'sandwich' );
  });

});