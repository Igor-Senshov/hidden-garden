// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('emailAutoCorrection', ['ionic'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .controller("FormController", ["$scope", function($scope) {
    // Initial values.
    $scope.showEmailError = false;
    $scope.offerSuggestion = false;

    // Array with some domain names.
    let domainList = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "mail.ru", "yandex.ru"];

    // https://jsperf.com/levenshtein-distance/25 Gustaf Andersson's Levenshtein
    // Optimised Levenshtein distance.
    function levenshtein(s, t) {
      if (s === t) {
        return 0;
      }
      var n = s.length, m = t.length;
      if (n === 0 || m === 0) {
        return n + m;
      }
      var x = 0, y, a, b, c, d, g, h, k;
      var p = new Array(n);
      for (y = 0; y < n;) {
        p[y] = ++y;
      }

      for (; (x + 3) < m; x += 4) {
        var e1 = t.charCodeAt(x);
        var e2 = t.charCodeAt(x + 1);
        var e3 = t.charCodeAt(x + 2);
        var e4 = t.charCodeAt(x + 3);
        c = x;
        b = x + 1;
        d = x + 2;
        g = x + 3;
        h = x + 4;
        for (y = 0; y < n; y++) {
          k = s.charCodeAt(y);
          a = p[y];
          if (a < c || b < c) {
            c = (a > b ? b + 1 : a + 1);
          }
          else {
            if (e1 !== k) {
              c++;
            }
          }

          if (c < b || d < b) {
            b = (c > d ? d + 1 : c + 1);
          }
          else {
            if (e2 !== k) {
              b++;
            }
          }

          if (b < d || g < d) {
            d = (b > g ? g + 1 : b + 1);
          }
          else {
            if (e3 !== k) {
              d++;
            }
          }

          if (d < g || h < g) {
            g = (d > h ? h + 1 : d + 1);
          }
          else {
            if (e4 !== k) {
              g++;
            }
          }
          p[y] = h = g;
          g = d;
          d = b;
          b = c;
          c = a;
        }
      }

      for (; x < m;) {
        var e = t.charCodeAt(x);
        c = x;
        d = ++x;
        for (y = 0; y < n; y++) {
          a = p[y];
          if (a < c || d < c) {
            d = (a > d ? d + 1 : a + 1);
          }
          else {
            if (e !== s.charCodeAt(y)) {
              d = c + 1;
            }
            else {
              d = c;
            }
          }
          p[y] = d;
          c = a;
        }
        h = d;
      }
      return h;
    }

    // Regex to test email.
    function validateEmail(email) {
      const emailTest = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailTest.test(email);
    }

    // Fetching email data.
    $scope.getInputEmail = (email) => {

      // Testing provided email.
      if (!validateEmail(email) || typeof email === "undefined") {
        $scope.showEmailError = true;
        $scope.offerSuggestion = false;
      } else {
        // Resetting initial values.
        $scope.showEmailError = false;
        $scope.offerSuggestion = false;

        // Grabbing email and making it lowercase.
        const rawEmail = angular.copy(email).toLowerCase();

        // Splitting email into parts.
        const domainNameIndex = rawEmail.indexOf("@")+1;
        const partBeforeAt = rawEmail.slice(0, domainNameIndex);
        const partAfterAt = rawEmail.slice(domainNameIndex);
        let partToReplace = "";

        // Comparing provided email with our list.
        for (let domain in domainList) {
          let stringSimilarityValue = levenshtein(partAfterAt, domainList[domain]);
          if (stringSimilarityValue <= 2 && stringSimilarityValue !== 0) {
            partToReplace = domainList[domain];
            $scope.offerSuggestion = true;
            $scope.suggestedEmail = `Did you mean ${partBeforeAt}${partToReplace}?`;

            // If tapped on "Yes" button add suggestion as a value and hide suggestion.
            $scope.tappedYes = () => {
              $scope.email = partBeforeAt+partToReplace;
              $scope.offerSuggestion = false;
            };

            // If tapped on "No" button just hide suggestion.
            $scope.tappedNo = () => {
              $scope.offerSuggestion = false;
            };
          }
        }
      }
    };

  }]);
