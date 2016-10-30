describe("FormController", function() {
  var scope, controller;
  var CheckEmail = {};
  var allInputEmails = readJSON("input-emails.json");
  var allOutputEmails = readJSON("changed-output-emails.json");
  var counter = 0;

  beforeEach(module("emailAutoCorrection"));

  beforeEach(inject(function($rootScope, $controller, _CheckEmail_) {
    scope = $rootScope.$new();
    CheckEmail = _CheckEmail_;
    controller = $controller("FormController", {$scope: scope});
  }));

  describe("Checking that CheckEmail methods are defined.", function() {
    it("CheckEmail.validateEmail should be defined", function() {
      expect(CheckEmail.validateEmail).toBeDefined();
    });

    it("CheckEmail.calculateLevenshtein should be defined", function() {
      expect(CheckEmail.calculateLevenshtein).toBeDefined();
    });
  });

  describe("Checking that getInputEmail is defined.", function() {
    it("scope.getInputEmail should be defined", function() {
      expect(scope.getInputEmail).toBeDefined();
    });
  });

  describe("Checking validateEmail.", function() {
    allInputEmails.failingEmails.map(function(e) {
      it("Should not pass", function() {
        expect(CheckEmail.validateEmail(e)).toBe(false);
      });
    });

    allInputEmails.typoEmails.map(function(e) {
      it("Should pass", function() {
        expect(CheckEmail.validateEmail(e)).toBe(true);
      });
    });

    allInputEmails.passingEmails.map(function(e) {
      it("Should pass", function() {
        expect(CheckEmail.validateEmail(e)).toBe(true);
      });
    });
  });

  describe("Checking calculateLevenshtein.", function() {
    it("Should equal to 2", function() {
      expect(CheckEmail.calculateLevenshtein("gail.cm", "gmail.com")).toEqual(2);
    });

    it("Should equal to 1", function() {
      expect(CheckEmail.calculateLevenshtein("gail.com", "gmail.com")).toEqual(1);
    });

    it("Should equal to 0", function() {
      expect(CheckEmail.calculateLevenshtein("gmail.com", "gmail.com")).toEqual(0);
    });
  });

  describe("Checking that suggestion or error is shown or not.", function() {
    allInputEmails.typoEmails.map(function(e) {
      it("Should show only email suggestion", function() {
        scope.getInputEmail(e);
        expect(scope.offerSuggestion).toBe(true);
        expect(scope.showEmailError).toBe(false);
      });
    });

    allInputEmails.failingEmails.map(function(e) {
      it("Should show only email error", function() {
        scope.getInputEmail(e);
        expect(scope.showEmailError).toBe(true);
        expect(scope.offerSuggestion).toBe(false);
      });
    });

    // Special case, maximum edits can be changed in app.ts (maxCharacterEdits variable).
    it("Should not show email suggestion (max edits is 2, below we have 3)", function() {
      scope.getInputEmail("email@gnael.cm");
      expect(scope.offerSuggestion).toBe(false);
    });

    allInputEmails.passingEmails.map(function(e) {
      it("Should not show email suggestion or email error", function() {
        scope.getInputEmail(e);
        expect(scope.offerSuggestion).toBe(false);
        expect(scope.showEmailError).toBe(false);
      });
    });

  });

  describe("Checking if email is changed.", function() {
    // Note: typoEmails should be the same length and order as outputEmails.
    allInputEmails.typoEmails.map(function(e) {
      it("Should change email if tapped Yes", function() {
        scope.email = e;
        scope.getInputEmail(e);
        scope.tappedYes();
        expect(scope.email).toEqual(allOutputEmails.outputEmails[counter++]);
      });
    });

    it("Should not change email if tapped No", function() {
      scope.email = "email@gnail.com";
      scope.getInputEmail(scope.email);
      scope.tappedNo();
      expect(scope.email).toEqual("email@gnail.com");
    });
  });

});
