describe( 'Instantiating a new heartbeat', function() {

  var heartbeat, spy;

  beforeEach(function() {

    spy = sinon.spy();

    contextObj = {
      pasta: true
    };

  });

  describe( 'and not passing a context', function() {

    beforeEach(function() {

      heartbeat = new Heartbeat({
        fn: spy
      });

      heartbeat._executeFn();

    });

    it( 'should execute the heartbeat with the window as the context', function() {
      expect( spy ).to.have.been.calledOnce;
      expect( spy ).to.have.been.calledOn( window );
    });

  });

  describe( 'and passing a context', function() {

    var contextObj;

    beforeEach(function() {

      contextObj = {
        pasta: true
      };

      heartbeat = new Heartbeat({
        fn: spy,
        context: contextObj
      });

      heartbeat._executeFn();

    });

    it( 'should execute the heartbeat with the window as the context', function() {
      expect( spy ).to.have.been.calledOnce;
      expect( spy ).to.have.been.calledOn( contextObj );
    });

  });

  describe( 'and passing args', function() {

    var argsArray;

    beforeEach(function() {

      argsArray = [
        true,
        200,
        'someString',
        { test: true }
      ];

      heartbeat = new Heartbeat({
        fn: spy,
        args: argsArray
      });

      heartbeat._executeFn();

    });

    it( 'should execute the heartbeat with the args', function() {
      expect( spy ).to.have.been.calledOnce;
      expect( spy.args[0] ).to.deep.equal( argsArray );
    });

  });

});