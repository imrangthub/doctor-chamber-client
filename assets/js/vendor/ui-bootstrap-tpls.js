/*
 * ui-bootstrap4
 * http://morgul.github.io/ui-bootstrap4/

 * Version: 3.0.5 - 2018-10-03
 * License: MIT
 */ angular.module(
  "ui.bootstrap",
  [
    "ui.bootstrap.tpls",
    "ui.bootstrap.collapse",
    "ui.bootstrap.tabindex",
    "ui.bootstrap.accordion",
    "ui.bootstrap.alert",
    "ui.bootstrap.buttons",
    "ui.bootstrap.carousel",
    "ui.bootstrap.common",
    "ui.bootstrap.dateparser",
    "ui.bootstrap.isClass",
    "ui.bootstrap.datepicker",
    "ui.bootstrap.position",
    "ui.bootstrap.datepickerPopup",
    "ui.bootstrap.debounce",
    "ui.bootstrap.multiMap",
    "ui.bootstrap.dropdown",
    "ui.bootstrap.stackedMap",
    "ui.bootstrap.modal",
    "ui.bootstrap.paging",
    "ui.bootstrap.pager",
    "ui.bootstrap.pagination",
    "ui.bootstrap.tooltip",
    "ui.bootstrap.popover",
    "ui.bootstrap.progressbar",
    "ui.bootstrap.rating",
    "ui.bootstrap.tabs",
    "ui.bootstrap.timepicker",
    "ui.bootstrap.typeahead"
  ]
),
  angular.module("ui.bootstrap.tpls", [
    "uib/template/accordion/accordion-group.html",
    "uib/template/accordion/accordion.html",
    "uib/template/alert/alert.html",
    "uib/template/carousel/carousel.html",
    "uib/template/carousel/slide.html",
    "uib/template/datepicker/datepicker.html",
    "uib/template/datepicker/day.html",
    "uib/template/datepicker/month.html",
    "uib/template/datepicker/year.html",
    "uib/template/datepickerPopup/popup.html",
    "uib/template/modal/window.html",
    "uib/template/pager/pager.html",
    "uib/template/pagination/pagination.html",
    "uib/template/tooltip/tooltip-html-popup.html",
    "uib/template/tooltip/tooltip-popup.html",
    "uib/template/tooltip/tooltip-template-popup.html",
    "uib/template/popover/popover-html.html",
    "uib/template/popover/popover-template.html",
    "uib/template/popover/popover.html",
    "uib/template/progressbar/bar.html",
    "uib/template/progressbar/progress.html",
    "uib/template/progressbar/progressbar.html",
    "uib/template/rating/rating.html",
    "uib/template/tabs/tab.html",
    "uib/template/tabs/tabset.html",
    "uib/template/timepicker/timepicker.html",
    "uib/template/typeahead/typeahead-match.html",
    "uib/template/typeahead/typeahead-popup.html"
  ]),
  angular.module("ui.bootstrap.collapse", []).directive("uibCollapse", [
    "$animate",
    "$q",
    "$parse",
    "$injector",
    function(a, b, c, d) {
      var e = d.has("$animateCss") ? d.get("$animateCss") : null;
      return {
        link: function(d, f, g) {
          function h() {
            (r = !!("horizontal" in g)),
              r
                ? ((s = { width: "" }), (t = { width: "0" }))
                : ((s = { height: "" }), (t = { height: "0" })),
              d.$eval(g.uibCollapse) ||
                f
                  .addClass("show")
                  .addClass("collapse")
                  .attr("aria-expanded", !0)
                  .attr("aria-hidden", !1)
                  .css(s);
          }
          function i(a) {
            return r
              ? { width: a.scrollWidth + "px" }
              : { height: a.scrollHeight + "px" };
          }
          function j() {
            (f.hasClass("collapse") && f.hasClass("show")) ||
              b.resolve(n(d)).then(function() {
                f
                  .removeClass("collapse")
                  .addClass("collapsing")
                  .attr("aria-expanded", !0)
                  .attr("aria-hidden", !1),
                  e
                    ? e(f, {
                        addClass: "show",
                        easing: "ease",
                        css: { overflow: "hidden" },
                        to: i(f[0])
                      })
                        .start()
                        ["finally"](k)
                    : a
                        .addClass(f, "show", {
                          css: { overflow: "hidden" },
                          to: i(f[0])
                        })
                        .then(k);
              }, angular.noop);
          }
          function k() {
            f
              .removeClass("collapsing")
              .addClass("collapse")
              .css(s),
              o(d);
          }
          function l() {
            return f.hasClass("collapse") || f.hasClass("show")
              ? void b.resolve(p(d)).then(function() {
                  f
                    .css(i(f[0]))
                    .removeClass("collapse")
                    .addClass("collapsing")
                    .attr("aria-expanded", !1)
                    .attr("aria-hidden", !0),
                    e
                      ? e(f, { removeClass: "show", to: t })
                          .start()
                          ["finally"](m)
                      : a.removeClass(f, "show", { to: t }).then(m);
                }, angular.noop)
              : m();
          }
          function m() {
            f.css(t), f.removeClass("collapsing").addClass("collapse"), q(d);
          }
          var n = c(g.expanding),
            o = c(g.expanded),
            p = c(g.collapsing),
            q = c(g.collapsed),
            r = !1,
            s = {},
            t = {};
          h(),
            d.$watch(g.uibCollapse, function(a) {
              a ? l() : j();
            });
        }
      };
    }
  ]),
  angular
    .module("ui.bootstrap.tabindex", [])
    .directive("uibTabindexToggle", function() {
      return {
        restrict: "A",
        link: function(a, b, c) {
          c.$observe("disabled", function(a) {
            c.$set("tabindex", a ? -1 : null);
          });
        }
      };
    }),
  angular
    .module("ui.bootstrap.accordion", [
      "ui.bootstrap.collapse",
      "ui.bootstrap.tabindex"
    ])
    .constant("uibAccordionConfig", { closeOthers: !0 })
    .controller("UibAccordionController", [
      "$scope",
      "$attrs",
      "uibAccordionConfig",
      function(a, b, c) {
        (this.groups = []),
          (this.closeOthers = function(d) {
            var e = angular.isDefined(b.closeOthers)
              ? a.$eval(b.closeOthers)
              : c.closeOthers;
            e &&
              angular.forEach(this.groups, function(a) {
                a !== d && (a.isOpen = !1);
              });
          }),
          (this.addGroup = function(a) {
            var b = this;
            this.groups.push(a),
              a.$on("$destroy", function(c) {
                b.removeGroup(a);
              });
          }),
          (this.removeGroup = function(a) {
            var b = this.groups.indexOf(a);
            b !== -1 && this.groups.splice(b, 1);
          });
      }
    ])
    .directive("uibAccordion", function() {
      return {
        controller: "UibAccordionController",
        controllerAs: "accordion",
        transclude: !0,
        templateUrl: function(a, b) {
          return b.templateUrl || "uib/template/accordion/accordion.html";
        }
      };
    })
    .directive("uibAccordionGroup", function() {
      return {
        require: "^uibAccordion",
        transclude: !0,
        restrict: "A",
        templateUrl: function(a, b) {
          return b.templateUrl || "uib/template/accordion/accordion-group.html";
        },
        scope: {
          heading: "@",
          cardClass: "@?",
          isOpen: "=?",
          isDisabled: "=?"
        },
        controller: function() {
          this.setHeading = function(a) {
            this.heading = a;
          };
        },
        link: function(a, b, c, d) {
          b.addClass("card"),
            d.addGroup(a),
            (a.openClass = c.openClass || "card-open"),
            (a.cardClass = c.cardClass || "card-default"),
            a.$watch("isOpen", function(c) {
              b.toggleClass(a.openClass, !!c), c && d.closeOthers(a);
            }),
            (a.toggleOpen = function(b) {
              a.isDisabled || (b && 32 !== b.which) || (a.isOpen = !a.isOpen);
            });
          var e =
            "accordiongroup-" + a.$id + "-" + Math.floor(1e4 * Math.random());
          (a.headingId = e + "-tab"), (a.cardId = e + "-card");
        }
      };
    })
    .directive("uibAccordionHeading", function() {
      return {
        transclude: !0,
        template: "",
        replace: !0,
        require: "^uibAccordionGroup",
        link: function(a, b, c, d, e) {
          d.setHeading(e(a, angular.noop));
        }
      };
    })
    .directive("uibAccordionTransclude", function() {
      function a() {
        return "uib-accordion-header,data-uib-accordion-header,x-uib-accordion-header,uib\\:accordion-header,[uib-accordion-header],[data-uib-accordion-header],[x-uib-accordion-header]";
      }
      return {
        require: "^uibAccordionGroup",
        link: function(b, c, d, e) {
          b.$watch(
            function() {
              return e[d.uibAccordionTransclude];
            },
            function(b) {
              if (b) {
                var d = angular.element(c[0].querySelector(a()));
                d.html(""), d.append(b);
              }
            }
          );
        }
      };
    }),
  angular
    .module("ui.bootstrap.alert", [])
    .controller("UibAlertController", [
      "$scope",
      "$element",
      "$attrs",
      "$interpolate",
      "$timeout",
      function(a, b, c, d, e) {
        (a.closeable = !!c.close),
          b.addClass("alert"),
          c.$set("role", "alert"),
          a.closeable && b.addClass("alert-dismissible");
        var f = angular.isDefined(c.dismissOnTimeout)
          ? d(c.dismissOnTimeout)(a.$parent)
          : null;
        f &&
          e(function() {
            a.close();
          }, parseInt(f, 10));
      }
    ])
    .directive("uibAlert", function() {
      return {
        controller: "UibAlertController",
        controllerAs: "alert",
        restrict: "A",
        templateUrl: function(a, b) {
          return b.templateUrl || "uib/template/alert/alert.html";
        },
        transclude: !0,
        scope: { close: "&" }
      };
    }),
  angular
    .module("ui.bootstrap.buttons", [])
    .constant("uibButtonConfig", {
      activeClass: "active",
      toggleEvent: "click"
    })
    .controller("UibButtonsController", [
      "uibButtonConfig",
      function(a) {
        (this.activeClass = a.activeClass || "active"),
          (this.toggleEvent = a.toggleEvent || "click");
      }
    ])
    .directive("uibBtnRadio", [
      "$parse",
      function(a) {
        return {
          require: ["uibBtnRadio", "ngModel"],
          controller: "UibButtonsController",
          controllerAs: "buttons",
          link: function(b, c, d, e) {
            var f = e[0],
              g = e[1],
              h = a(d.uibUncheckable);
            c.find("input").css({ display: "none" }),
              (g.$render = function() {
                c.toggleClass(
                  f.activeClass,
                  angular.equals(g.$modelValue, b.$eval(d.uibBtnRadio))
                );
              }),
              c.on(f.toggleEvent, function() {
                if (!d.disabled) {
                  var a = c.hasClass(f.activeClass);
                  (a && !angular.isDefined(d.uncheckable)) ||
                    b.$apply(function() {
                      g.$setViewValue(a ? null : b.$eval(d.uibBtnRadio)),
                        g.$render();
                    });
                }
              }),
              d.uibUncheckable &&
                b.$watch(h, function(a) {
                  d.$set("uncheckable", a ? "" : void 0);
                });
          }
        };
      }
    ])
    .directive("uibBtnCheckbox", function() {
      return {
        require: ["uibBtnCheckbox", "ngModel"],
        controller: "UibButtonsController",
        controllerAs: "button",
        link: function(a, b, c, d) {
          function e() {
            return g(c.btnCheckboxTrue, !0);
          }
          function f() {
            return g(c.btnCheckboxFalse, !1);
          }
          function g(b, c) {
            return angular.isDefined(b) ? a.$eval(b) : c;
          }
          var h = d[0],
            i = d[1];
          b.find("input").css({ display: "none" }),
            (i.$render = function() {
              b.toggleClass(h.activeClass, angular.equals(i.$modelValue, e()));
            }),
            b.on(h.toggleEvent, function() {
              c.disabled ||
                a.$apply(function() {
                  i.$setViewValue(b.hasClass(h.activeClass) ? f() : e()),
                    i.$render();
                });
            });
        }
      };
    }),
  angular
    .module("ui.bootstrap.carousel", [])
    .controller("UibCarouselController", [
      "$scope",
      "$element",
      "$interval",
      "$timeout",
      "$animate",
      function(a, b, c, d, e) {
        function f(a) {
          for (var b = 0; b < p.length; b++) p[b].slide.active = b === a;
        }
        function g(c, d, g) {
          if (!s) {
            if (
              (angular.extend(c, { direction: g }),
              angular.extend(p[r].slide || {}, { direction: g }),
              e.enabled(b) &&
                !a.$currentTransition &&
                p[d].element &&
                o.slides.length > 1)
            ) {
              p[d].element.data(q, c.direction);
              var h = o.getCurrentIndex();
              angular.isNumber(h) &&
                p[h].element &&
                p[h].element.data(q, c.direction),
                (a.$currentTransition = !0),
                e.on("addClass", p[d].element, function(b, c) {
                  "close" === c &&
                    ((a.$currentTransition = null), e.off("addClass", b));
                });
            }
            (a.active = c.index), (r = c.index), f(d), k();
          }
        }
        function h(a) {
          for (var b = 0; b < p.length; b++) if (p[b].slide === a) return b;
        }
        function i() {
          m && (c.cancel(m), (m = null));
        }
        function j(b) {
          b.length || (a.$currentTransition = null);
        }
        function k() {
          i();
          var b = +a.interval;
          !isNaN(b) && b > 0 && (m = c(l, b));
        }
        function l() {
          var b = +a.interval;
          n && !isNaN(b) && b > 0 && p.length ? a.next() : a.pause();
        }
        var m,
          n,
          o = this,
          p = (o.slides = a.slides = []),
          q = "uib-slideDirection",
          r = a.active,
          s = !1;
        b.addClass("carousel"),
          (o.addSlide = function(b, c) {
            p.push({ slide: b, element: c }),
              p.sort(function(a, b) {
                return +a.slide.index - +b.slide.index;
              }),
              (b.index === a.active ||
                (1 === p.length && !angular.isNumber(a.active))) &&
                (a.$currentTransition && (a.$currentTransition = null),
                (r = b.index),
                (a.active = b.index),
                f(r),
                o.select(p[h(b)]),
                1 === p.length && a.play());
          }),
          (o.getCurrentIndex = function() {
            for (var a = 0; a < p.length; a++)
              if (p[a].slide.index === r) return a;
          }),
          (o.next = a.next = function() {
            var b = (o.getCurrentIndex() + 1) % p.length;
            return 0 === b && a.noWrap()
              ? void a.pause()
              : o.select(p[b], "next");
          }),
          (o.prev = a.prev = function() {
            var b =
              o.getCurrentIndex() - 1 < 0
                ? p.length - 1
                : o.getCurrentIndex() - 1;
            return a.noWrap() && b === p.length - 1
              ? void a.pause()
              : o.select(p[b], "prev");
          }),
          (o.removeSlide = function(b) {
            var c = h(b);
            p.splice(c, 1),
              p.length > 0 && r === c
                ? c >= p.length
                  ? ((r = p.length - 1),
                    (a.active = r),
                    f(r),
                    o.select(p[p.length - 1]))
                  : ((r = c), (a.active = r), f(r), o.select(p[c]))
                : r > c && (r--, (a.active = r)),
              0 === p.length && ((r = null), (a.active = null));
          }),
          (o.select = a.select = function(b, c) {
            var d = h(b.slide);
            void 0 === c && (c = d > o.getCurrentIndex() ? "next" : "prev"),
              b.slide.index === r || a.$currentTransition || g(b.slide, d, c);
          }),
          (a.indexOfSlide = function(a) {
            return +a.slide.index;
          }),
          (a.isActive = function(b) {
            return a.active === b.slide.index;
          }),
          (a.isPrevDisabled = function() {
            return 0 === a.active && a.noWrap();
          }),
          (a.isNextDisabled = function() {
            return a.active === p.length - 1 && a.noWrap();
          }),
          (a.pause = function() {
            a.noPause || ((n = !1), i());
          }),
          (a.play = function() {
            n || ((n = !0), k());
          }),
          b.on("mouseenter", a.pause),
          b.on("mouseleave", a.play),
          a.$on("$destroy", function() {
            (s = !0), i();
          }),
          a.$watch("noTransition", function(a) {
            e.enabled(b, !a);
          }),
          a.$watch("interval", k),
          a.$watchCollection("slides", j),
          a.$watch("active", function(a) {
            if (angular.isNumber(a) && r !== a) {
              for (var b = 0; b < p.length; b++)
                if (p[b].slide.index === a) {
                  a = b;
                  break;
                }
              var c = p[a];
              c && (f(a), o.select(p[a]), (r = a));
            }
          });
      }
    ])
    .directive("uibCarousel", function() {
      return {
        transclude: !0,
        controller: "UibCarouselController",
        controllerAs: "carousel",
        restrict: "A",
        templateUrl: function(a, b) {
          return b.templateUrl || "uib/template/carousel/carousel.html";
        },
        scope: {
          active: "=?",
          interval: "=",
          noTransition: "=",
          noPause: "=",
          noWrap: "&"
        }
      };
    })
    .directive("uibSlide", [
      "$animate",
      function(a) {
        return {
          require: "^uibCarousel",
          restrict: "A",
          transclude: !0,
          templateUrl: function(a, b) {
            return b.templateUrl || "uib/template/carousel/slide.html";
          },
          scope: { actual: "=?", index: "=?" },
          link: function(b, c, d, e) {
            c.addClass("carousel-item"),
              e.addSlide(b, c),
              b.$on("$destroy", function() {
                e.removeSlide(b);
              }),
              b.$watch("active", function(b) {
                a[b ? "addClass" : "removeClass"](c, "active");
              });
          }
        };
      }
    ])
    .animation(".carousel-item", [
      "$animateCss",
      function(a) {
        function b(a, b, c) {
          a.removeClass(b), c && c();
        }
        var c = "uib-slideDirection",
          d = "carousel-item-";
        return {
          beforeAddClass: function(e, f, g) {
            if ("active" === f) {
              var h = !1,
                i = e.data(c),
                j = "next" === i ? d + "left" : d + "right",
                k = b.bind(this, e, [j, d + i].join(" "), g);
              return (
                e.addClass(d + i),
                a(e, { addClass: j })
                  .start()
                  .done(k),
                function() {
                  h = !0;
                }
              );
            }
            g();
          },
          beforeRemoveClass: function(e, f, g) {
            if ("active" === f) {
              var h = !1,
                i = e.data(c),
                j = "next" === i ? d + "left" : d + "right",
                k = b.bind(this, e, j, g);
              return (
                a(e, { addClass: j })
                  .start()
                  .done(k),
                function() {
                  h = !0;
                }
              );
            }
            g();
          }
        };
      }
    ]),
  angular.module("ui.bootstrap.common", []),
  angular.module("ui.bootstrap.dateparser", []).service("uibDateParser", [
    "$log",
    "$locale",
    "dateFilter",
    "orderByFilter",
    "filterFilter",
    function(a, b, c, d, e) {
      function f(a) {
        return e(s, { key: a }, !0)[0];
      }
      function g(a) {
        var b = [],
          c = a.split(""),
          e = a.indexOf("'");
        if (e > -1) {
          var f = !1;
          a = a.split("");
          for (var g = e; g < a.length; g++)
            f
              ? ("'" === a[g] &&
                  (g + 1 < a.length && "'" === a[g + 1]
                    ? ((a[g + 1] = "$"), (c[g + 1] = ""))
                    : ((c[g] = ""), (f = !1))),
                (a[g] = "$"))
              : "'" === a[g] && ((a[g] = "$"), (c[g] = ""), (f = !0));
          a = a.join("");
        }
        return (
          angular.forEach(s, function(d) {
            var e = a.indexOf(d.key);
            if (e > -1) {
              (a = a.split("")), (c[e] = "(" + d.regex + ")"), (a[e] = "$");
              for (var f = e + 1, g = e + d.key.length; f < g; f++)
                (c[f] = ""), (a[f] = "$");
              (a = a.join("")),
                b.push({
                  index: e,
                  key: d.key,
                  apply: d.apply,
                  matcher: d.regex
                });
            }
          }),
          { regex: new RegExp("^" + c.join("") + "$"), map: d(b, "index") }
        );
      }
      function h(a) {
        for (var b, c, d = [], e = 0; e < a.length; )
          if (angular.isNumber(c)) {
            if ("'" === a.charAt(e))
              (e + 1 >= a.length || "'" !== a.charAt(e + 1)) &&
                (d.push(i(a, c, e)), (c = null));
            else if (e === a.length)
              for (; c < a.length; ) (b = j(a, c)), d.push(b), (c = b.endIdx);
            e++;
          } else
            "'" !== a.charAt(e)
              ? ((b = j(a, e)), d.push(b.parser), (e = b.endIdx))
              : ((c = e), e++);
        return d;
      }
      function i(a, b, c) {
        return function() {
          return a.substr(b + 1, c - b - 1);
        };
      }
      function j(a, b) {
        for (var c = a.substr(b), d = 0; d < s.length; d++)
          if (new RegExp("^" + s[d].key).test(c)) {
            var e = s[d];
            return { endIdx: b + e.key.length, parser: e.formatter };
          }
        return {
          endIdx: b + 1,
          parser: function() {
            return c.charAt(0);
          }
        };
      }
      function k(a, b, c) {
        return (
          !(c < 1) &&
          (1 === b && c > 28
            ? 29 === c && ((a % 4 === 0 && a % 100 !== 0) || a % 400 === 0)
            : (3 !== b && 5 !== b && 8 !== b && 10 !== b) || c < 31)
        );
      }
      function l(a) {
        return parseInt(a, 10);
      }
      function m(a, b) {
        return a && b ? q(a, b) : a;
      }
      function n(a, b) {
        return a && b ? q(a, b, !0) : a;
      }
      function o(a, b) {
        a = a.replace(/:/g, "");
        var c = Date.parse("Jan 01, 1970 00:00:00 " + a) / 6e4;
        return isNaN(c) ? b : c;
      }
      function p(a, b) {
        return (a = new Date(a.getTime())), a.setMinutes(a.getMinutes() + b), a;
      }
      function q(a, b, c) {
        c = c ? -1 : 1;
        var d = a.getTimezoneOffset(),
          e = o(b, d);
        return p(a, c * (e - d));
      }
      var r,
        s,
        t = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
      (this.init = function() {
        (r = b.id),
          (this.parsers = {}),
          (this.formatters = {}),
          (s = [
            {
              key: "yyyy",
              regex: "\\d{4}",
              apply: function(a) {
                this.year = +a;
              },
              formatter: function(a) {
                var b = new Date();
                return b.setFullYear(Math.abs(a.getFullYear())), c(b, "yyyy");
              }
            },
            {
              key: "yy",
              regex: "\\d{2}",
              apply: function(a) {
                (a = +a), (this.year = a < 69 ? a + 2e3 : a + 1900);
              },
              formatter: function(a) {
                var b = new Date();
                return b.setFullYear(Math.abs(a.getFullYear())), c(b, "yy");
              }
            },
            {
              key: "y",
              regex: "\\d{1,4}",
              apply: function(a) {
                this.year = +a;
              },
              formatter: function(a) {
                var b = new Date();
                return b.setFullYear(Math.abs(a.getFullYear())), c(b, "y");
              }
            },
            {
              key: "M!",
              regex: "0?[1-9]|1[0-2]",
              apply: function(a) {
                this.month = a - 1;
              },
              formatter: function(a) {
                var b = a.getMonth();
                return /^[0-9]$/.test(b) ? c(a, "MM") : c(a, "M");
              }
            },
            {
              key: "MMMM",
              regex: b.DATETIME_FORMATS.MONTH.join("|"),
              apply: function(a) {
                this.month = b.DATETIME_FORMATS.MONTH.indexOf(a);
              },
              formatter: function(a) {
                return c(a, "MMMM");
              }
            },
            {
              key: "MMM",
              regex: b.DATETIME_FORMATS.SHORTMONTH.join("|"),
              apply: function(a) {
                this.month = b.DATETIME_FORMATS.SHORTMONTH.indexOf(a);
              },
              formatter: function(a) {
                return c(a, "MMM");
              }
            },
            {
              key: "MM",
              regex: "0[1-9]|1[0-2]",
              apply: function(a) {
                this.month = a - 1;
              },
              formatter: function(a) {
                return c(a, "MM");
              }
            },
            {
              key: "M",
              regex: "[1-9]|1[0-2]",
              apply: function(a) {
                this.month = a - 1;
              },
              formatter: function(a) {
                return c(a, "M");
              }
            },
            {
              key: "d!",
              regex: "[0-2]?[0-9]{1}|3[0-1]{1}",
              apply: function(a) {
                this.date = +a;
              },
              formatter: function(a) {
                var b = a.getDate();
                return /^[1-9]$/.test(b) ? c(a, "dd") : c(a, "d");
              }
            },
            {
              key: "dd",
              regex: "[0-2][0-9]{1}|3[0-1]{1}",
              apply: function(a) {
                this.date = +a;
              },
              formatter: function(a) {
                return c(a, "dd");
              }
            },
            {
              key: "d",
              regex: "[1-2]?[0-9]{1}|3[0-1]{1}",
              apply: function(a) {
                this.date = +a;
              },
              formatter: function(a) {
                return c(a, "d");
              }
            },
            {
              key: "EEEE",
              regex: b.DATETIME_FORMATS.DAY.join("|"),
              formatter: function(a) {
                return c(a, "EEEE");
              }
            },
            {
              key: "EEE",
              regex: b.DATETIME_FORMATS.SHORTDAY.join("|"),
              formatter: function(a) {
                return c(a, "EEE");
              }
            },
            {
              key: "HH",
              regex: "(?:0|1)[0-9]|2[0-3]",
              apply: function(a) {
                this.hours = +a;
              },
              formatter: function(a) {
                return c(a, "HH");
              }
            },
            {
              key: "hh",
              regex: "0[0-9]|1[0-2]",
              apply: function(a) {
                this.hours = +a;
              },
              formatter: function(a) {
                return c(a, "hh");
              }
            },
            {
              key: "H",
              regex: "1?[0-9]|2[0-3]",
              apply: function(a) {
                this.hours = +a;
              },
              formatter: function(a) {
                return c(a, "H");
              }
            },
            {
              key: "h",
              regex: "[0-9]|1[0-2]",
              apply: function(a) {
                this.hours = +a;
              },
              formatter: function(a) {
                return c(a, "h");
              }
            },
            {
              key: "mm",
              regex: "[0-5][0-9]",
              apply: function(a) {
                this.minutes = +a;
              },
              formatter: function(a) {
                return c(a, "mm");
              }
            },
            {
              key: "m",
              regex: "[0-9]|[1-5][0-9]",
              apply: function(a) {
                this.minutes = +a;
              },
              formatter: function(a) {
                return c(a, "m");
              }
            },
            {
              key: "sss",
              regex: "[0-9][0-9][0-9]",
              apply: function(a) {
                this.milliseconds = +a;
              },
              formatter: function(a) {
                return c(a, "sss");
              }
            },
            {
              key: "ss",
              regex: "[0-5][0-9]",
              apply: function(a) {
                this.seconds = +a;
              },
              formatter: function(a) {
                return c(a, "ss");
              }
            },
            {
              key: "s",
              regex: "[0-9]|[1-5][0-9]",
              apply: function(a) {
                this.seconds = +a;
              },
              formatter: function(a) {
                return c(a, "s");
              }
            },
            {
              key: "a",
              regex: b.DATETIME_FORMATS.AMPMS.join("|"),
              apply: function(a) {
                12 === this.hours && (this.hours = 0),
                  "PM" === a && (this.hours += 12);
              },
              formatter: function(a) {
                return c(a, "a");
              }
            },
            {
              key: "Z",
              regex: "[+-]\\d{4}",
              apply: function(a) {
                var b = a.match(/([+-])(\d{2})(\d{2})/),
                  c = b[1],
                  d = b[2],
                  e = b[3];
                (this.hours += l(c + d)), (this.minutes += l(c + e));
              },
              formatter: function(a) {
                return c(a, "Z");
              }
            },
            {
              key: "ww",
              regex: "[0-4][0-9]|5[0-3]",
              formatter: function(a) {
                return c(a, "ww");
              }
            },
            {
              key: "w",
              regex: "[0-9]|[1-4][0-9]|5[0-3]",
              formatter: function(a) {
                return c(a, "w");
              }
            },
            {
              key: "GGGG",
              regex: b.DATETIME_FORMATS.ERANAMES.join("|").replace(
                /\s/g,
                "\\s"
              ),
              formatter: function(a) {
                return c(a, "GGGG");
              }
            },
            {
              key: "GGG",
              regex: b.DATETIME_FORMATS.ERAS.join("|"),
              formatter: function(a) {
                return c(a, "GGG");
              }
            },
            {
              key: "GG",
              regex: b.DATETIME_FORMATS.ERAS.join("|"),
              formatter: function(a) {
                return c(a, "GG");
              }
            },
            {
              key: "G",
              regex: b.DATETIME_FORMATS.ERAS.join("|"),
              formatter: function(a) {
                return c(a, "G");
              }
            }
          ]),
          angular.version.major >= 1 &&
            angular.version.minor > 4 &&
            s.push({
              key: "LLLL",
              regex: b.DATETIME_FORMATS.STANDALONEMONTH.join("|"),
              apply: function(a) {
                this.month = b.DATETIME_FORMATS.STANDALONEMONTH.indexOf(a);
              },
              formatter: function(a) {
                return c(a, "LLLL");
              }
            });
      }),
        this.init(),
        (this.getParser = function(a) {
          var b = f(a);
          return (b && b.apply) || null;
        }),
        (this.overrideParser = function(a, b) {
          var c = f(a);
          c && angular.isFunction(b) && ((this.parsers = {}), (c.apply = b));
        }.bind(this)),
        (this.filter = function(a, c) {
          if (!angular.isDate(a) || isNaN(a) || !c) return "";
          (c = b.DATETIME_FORMATS[c] || c),
            b.id !== r && this.init(),
            this.formatters[c] || (this.formatters[c] = h(c));
          var d = this.formatters[c];
          return d.reduce(function(b, c) {
            return b + c(a);
          }, "");
        }),
        (this.parse = function(c, d, e) {
          if (!angular.isString(c) || !d) return c;
          (d = b.DATETIME_FORMATS[d] || d),
            (d = d.replace(t, "\\$&")),
            b.id !== r && this.init(),
            this.parsers[d] || (this.parsers[d] = g(d, "apply"));
          var f = this.parsers[d],
            h = f.regex,
            i = f.map,
            j = c.match(h),
            l = !1;
          if (j && j.length) {
            var m, n;
            angular.isDate(e) && !isNaN(e.getTime())
              ? (m = {
                  year: e.getFullYear(),
                  month: e.getMonth(),
                  date: e.getDate(),
                  hours: e.getHours(),
                  minutes: e.getMinutes(),
                  seconds: e.getSeconds(),
                  milliseconds: e.getMilliseconds()
                })
              : (e && a.warn("dateparser:", "baseDate is not a valid date"),
                (m = {
                  year: 1900,
                  month: 0,
                  date: 1,
                  hours: 0,
                  minutes: 0,
                  seconds: 0,
                  milliseconds: 0
                }));
            for (var o = 1, p = j.length; o < p; o++) {
              var q = i[o - 1];
              "Z" === q.matcher && (l = !0), q.apply && q.apply.call(m, j[o]);
            }
            var s = l
                ? Date.prototype.setUTCFullYear
                : Date.prototype.setFullYear,
              u = l ? Date.prototype.setUTCHours : Date.prototype.setHours;
            return (
              k(m.year, m.month, m.date) &&
                (!angular.isDate(e) || isNaN(e.getTime()) || l
                  ? ((n = new Date(0)),
                    s.call(n, m.year, m.month, m.date),
                    u.call(
                      n,
                      m.hours || 0,
                      m.minutes || 0,
                      m.seconds || 0,
                      m.milliseconds || 0
                    ))
                  : ((n = new Date(e)),
                    s.call(n, m.year, m.month, m.date),
                    u.call(n, m.hours, m.minutes, m.seconds, m.milliseconds))),
              n
            );
          }
        }),
        (this.toTimezone = m),
        (this.fromTimezone = n),
        (this.timezoneToOffset = o),
        (this.addDateMinutes = p),
        (this.convertTimezoneToLocal = q);
    }
  ]),
  angular.module("ui.bootstrap.isClass", []).directive("uibIsClass", [
    "$animate",
    function(a) {
      var b = /^\s*([\s\S]+?)\s+on\s+([\s\S]+?)\s*$/,
        c = /^\s*([\s\S]+?)\s+for\s+([\s\S]+?)\s*$/;
      return {
        restrict: "A",
        compile: function(d, e) {
          function f(a, b, c) {
            i.push(a),
              j.push({ scope: a, element: b }),
              o.forEach(function(b, c) {
                g(b, a);
              }),
              a.$on("$destroy", h);
          }
          function g(b, d) {
            var e = b.match(c),
              f = d.$eval(e[1]),
              g = e[2],
              h = k[b];
            if (!h) {
              var i = function(b) {
                var c = null;
                j.some(function(a) {
                  var d = a.scope.$eval(m);
                  if (d === b) return (c = a), !0;
                }),
                  h.lastActivated !== c &&
                    (h.lastActivated &&
                      a.removeClass(h.lastActivated.element, f),
                    c && a.addClass(c.element, f),
                    (h.lastActivated = c));
              };
              k[b] = h = {
                lastActivated: null,
                scope: d,
                watchFn: i,
                compareWithExp: g,
                watcher: d.$watch(g, i)
              };
            }
            h.watchFn(d.$eval(g));
          }
          function h(a) {
            var b = a.targetScope,
              c = i.indexOf(b);
            if ((i.splice(c, 1), j.splice(c, 1), i.length)) {
              var d = i[0];
              angular.forEach(k, function(a) {
                a.scope === b &&
                  ((a.watcher = d.$watch(a.compareWithExp, a.watchFn)),
                  (a.scope = d));
              });
            } else k = {};
          }
          var i = [],
            j = [],
            k = {},
            l = e.uibIsClass.match(b),
            m = l[2],
            n = l[1],
            o = n.split(",");
          return f;
        }
      };
    }
  ]),
  angular
    .module("ui.bootstrap.datepicker", [
      "ui.bootstrap.dateparser",
      "ui.bootstrap.isClass"
    ])
    .value("$datepickerSuppressError", !1)
    .value("$datepickerLiteralWarning", !0)
    .constant("uibDatepickerConfig", {
      datepickerMode: "day",
      formatDay: "dd",
      formatMonth: "MMMM",
      formatYear: "yyyy",
      formatDayHeader: "EEE",
      formatDayTitle: "MMMM yyyy",
      formatMonthTitle: "yyyy",
      maxDate: null,
      maxMode: "year",
      minDate: null,
      minMode: "day",
      monthColumns: 3,
      ngModelOptions: {},
      shortcutPropagation: !1,
      showWeeks: !0,
      yearColumns: 5,
      yearRows: 4
    })
    .controller("UibDatepickerController", [
      "$scope",
      "$element",
      "$attrs",
      "$parse",
      "$interpolate",
      "$locale",
      "$log",
      "dateFilter",
      "uibDatepickerConfig",
      "$datepickerLiteralWarning",
      "$datepickerSuppressError",
      "uibDateParser",
      function(a, b, c, d, e, f, g, h, i, j, k, l) {
        function m(b) {
          (a.datepickerMode = b), (a.datepickerOptions.datepickerMode = b);
        }
        function n(b) {
          var c;
          if (angular.version.minor < 6)
            (c =
              b.$options ||
              a.datepickerOptions.ngModelOptions ||
              i.ngModelOptions ||
              {}),
              (c.getOption = function(a) {
                return c[a];
              });
          else {
            var d =
              b.$options.getOption("timezone") ||
              (a.datepickerOptions.ngModelOptions
                ? a.datepickerOptions.ngModelOptions.timezone
                : null) ||
              (i.ngModelOptions ? i.ngModelOptions.timezone : null);
            c = b.$options
              .createChild(i.ngModelOptions)
              .createChild(a.datepickerOptions.ngModelOptions)
              .createChild(b.$options)
              .createChild({ timezone: d });
          }
          return c;
        }
        var o = this,
          p = { $setViewValue: angular.noop },
          q = {},
          r = [];
        b.addClass("uib-datepicker"),
          c.$set("role", "application"),
          a.datepickerOptions || (a.datepickerOptions = {}),
          (this.modes = ["day", "month", "year"]),
          [
            "customClass",
            "dateDisabled",
            "datepickerMode",
            "formatDay",
            "formatDayHeader",
            "formatDayTitle",
            "formatMonth",
            "formatMonthTitle",
            "formatYear",
            "maxDate",
            "maxMode",
            "minDate",
            "minMode",
            "monthColumns",
            "showWeeks",
            "shortcutPropagation",
            "startingDay",
            "yearColumns",
            "yearRows"
          ].forEach(function(b) {
            switch (b) {
              case "customClass":
              case "dateDisabled":
                a[b] = a.datepickerOptions[b] || angular.noop;
                break;
              case "datepickerMode":
                a.datepickerMode = angular.isDefined(
                  a.datepickerOptions.datepickerMode
                )
                  ? a.datepickerOptions.datepickerMode
                  : i.datepickerMode;
                break;
              case "formatDay":
              case "formatDayHeader":
              case "formatDayTitle":
              case "formatMonth":
              case "formatMonthTitle":
              case "formatYear":
                o[b] = angular.isDefined(a.datepickerOptions[b])
                  ? e(a.datepickerOptions[b])(a.$parent)
                  : i[b];
                break;
              case "monthColumns":
              case "showWeeks":
              case "shortcutPropagation":
              case "yearColumns":
              case "yearRows":
                o[b] = angular.isDefined(a.datepickerOptions[b])
                  ? a.datepickerOptions[b]
                  : i[b];
                break;
              case "startingDay":
                angular.isDefined(a.datepickerOptions.startingDay)
                  ? (o.startingDay = a.datepickerOptions.startingDay)
                  : angular.isNumber(i.startingDay)
                    ? (o.startingDay = i.startingDay)
                    : (o.startingDay =
                        (f.DATETIME_FORMATS.FIRSTDAYOFWEEK + 8) % 7);
                break;
              case "maxDate":
              case "minDate":
                a.$watch("datepickerOptions." + b, function(a) {
                  a
                    ? angular.isDate(a)
                      ? (o[b] = l.fromTimezone(
                          new Date(a),
                          q.getOption("timezone")
                        ))
                      : (j &&
                          g.warn(
                            "Literal date support has been deprecated, please switch to date object usage"
                          ),
                        (o[b] = new Date(h(a, "medium"))))
                    : (o[b] = i[b]
                        ? l.fromTimezone(
                            new Date(i[b]),
                            q.getOption("timezone")
                          )
                        : null),
                    o.refreshView();
                });
                break;
              case "maxMode":
              case "minMode":
                a.datepickerOptions[b]
                  ? a.$watch(
                      function() {
                        return a.datepickerOptions[b];
                      },
                      function(c) {
                        (o[b] = a[b] = angular.isDefined(c)
                          ? c
                          : a.datepickerOptions[b]),
                          (("minMode" === b &&
                            o.modes.indexOf(
                              a.datepickerOptions.datepickerMode
                            ) < o.modes.indexOf(o[b])) ||
                            ("maxMode" === b &&
                              o.modes.indexOf(
                                a.datepickerOptions.datepickerMode
                              ) > o.modes.indexOf(o[b]))) &&
                            ((a.datepickerMode = o[b]),
                            (a.datepickerOptions.datepickerMode = o[b]));
                      }
                    )
                  : (o[b] = a[b] = i[b] || null);
            }
          }),
          (a.uniqueId =
            "datepicker-" + a.$id + "-" + Math.floor(1e4 * Math.random())),
          (a.disabled = angular.isDefined(c.disabled) || !1),
          angular.isDefined(c.ngDisabled) &&
            r.push(
              a.$parent.$watch(c.ngDisabled, function(b) {
                (a.disabled = b), o.refreshView();
              })
            ),
          (a.isActive = function(b) {
            return (
              0 === o.compare(b.date, o.activeDate) &&
              ((a.activeDateId = b.uid), !0)
            );
          }),
          (this.init = function(b) {
            (p = b),
              (q = n(p)),
              a.datepickerOptions.initDate
                ? ((o.activeDate =
                    l.fromTimezone(
                      a.datepickerOptions.initDate,
                      q.getOption("timezone")
                    ) || new Date()),
                  a.$watch("datepickerOptions.initDate", function(a) {
                    a &&
                      (p.$isEmpty(p.$modelValue) || p.$invalid) &&
                      ((o.activeDate = l.fromTimezone(
                        a,
                        q.getOption("timezone")
                      )),
                      o.refreshView());
                  }))
                : (o.activeDate = new Date());
            var c = p.$modelValue ? new Date(p.$modelValue) : new Date();
            (this.activeDate = isNaN(c)
              ? l.fromTimezone(new Date(), q.getOption("timezone"))
              : l.fromTimezone(c, q.getOption("timezone"))),
              (p.$render = function() {
                o.render();
              });
          }),
          (this.render = function() {
            if (p.$viewValue) {
              var a = new Date(p.$viewValue),
                b = !isNaN(a);
              b
                ? (this.activeDate = l.fromTimezone(a, q.getOption("timezone")))
                : k ||
                  g.error(
                    'Datepicker directive: "ng-model" value must be a Date object'
                  );
            }
            this.refreshView();
          }),
          (this.refreshView = function() {
            if (this.element) {
              (a.selectedDt = null),
                this._refreshView(),
                a.activeDt && (a.activeDateId = a.activeDt.uid);
              var b = p.$viewValue ? new Date(p.$viewValue) : null;
              (b = l.fromTimezone(b, q.getOption("timezone"))),
                p.$setValidity(
                  "dateDisabled",
                  !b || (this.element && !this.isDisabled(b))
                );
            }
          }),
          (this.createDateObject = function(b, c) {
            var d = p.$viewValue ? new Date(p.$viewValue) : null;
            d = l.fromTimezone(d, q.getOption("timezone"));
            var e = new Date();
            e = l.fromTimezone(e, q.getOption("timezone"));
            var f = this.compare(b, e),
              g = {
                date: b,
                label: l.filter(b, c),
                selected: d && 0 === this.compare(b, d),
                disabled: this.isDisabled(b),
                past: f < 0,
                current: 0 === f,
                future: f > 0,
                customClass: this.customClass(b) || null
              };
            return (
              d && 0 === this.compare(b, d) && (a.selectedDt = g),
              o.activeDate &&
                0 === this.compare(g.date, o.activeDate) &&
                (a.activeDt = g),
              g
            );
          }),
          (this.isDisabled = function(b) {
            return (
              a.disabled ||
              (this.minDate && this.compare(b, this.minDate) < 0) ||
              (this.maxDate && this.compare(b, this.maxDate) > 0) ||
              (a.dateDisabled &&
                a.dateDisabled({ date: b, mode: a.datepickerMode }))
            );
          }),
          (this.customClass = function(b) {
            return a.customClass({ date: b, mode: a.datepickerMode });
          }),
          (this.split = function(a, b) {
            for (var c = []; a.length > 0; ) c.push(a.splice(0, b));
            return c;
          }),
          (a.select = function(b) {
            if (a.datepickerMode === o.minMode) {
              var c = p.$viewValue
                ? l.fromTimezone(
                    new Date(p.$viewValue),
                    q.getOption("timezone")
                  )
                : new Date(0, 0, 0, 0, 0, 0, 0);
              c.setFullYear(b.getFullYear(), b.getMonth(), b.getDate()),
                (c = l.toTimezone(c, q.getOption("timezone"))),
                p.$setViewValue(c),
                p.$render();
            } else
              (o.activeDate = b),
                m(o.modes[o.modes.indexOf(a.datepickerMode) - 1]),
                a.$emit("uib:datepicker.mode");
            a.$broadcast("uib:datepicker.focus");
          }),
          (a.move = function(a) {
            var b = o.activeDate.getFullYear() + a * (o.step.years || 0),
              c = o.activeDate.getMonth() + a * (o.step.months || 0);
            o.activeDate.setFullYear(b, c, 1), o.refreshView();
          }),
          (a.toggleMode = function(b) {
            (b = b || 1),
              (a.datepickerMode === o.maxMode && 1 === b) ||
                (a.datepickerMode === o.minMode && b === -1) ||
                (m(o.modes[o.modes.indexOf(a.datepickerMode) + b]),
                a.$emit("uib:datepicker.mode"));
          }),
          (a.keys = {
            13: "enter",
            32: "space",
            33: "pageup",
            34: "pagedown",
            35: "end",
            36: "home",
            37: "left",
            38: "up",
            39: "right",
            40: "down"
          });
        var s = function() {
          o.element[0].focus();
        };
        a.$on("uib:datepicker.focus", s),
          (a.keydown = function(b) {
            var c = a.keys[b.which];
            if (c && !b.shiftKey && !b.altKey && !a.disabled)
              if (
                (b.preventDefault(),
                o.shortcutPropagation || b.stopPropagation(),
                "enter" === c || "space" === c)
              ) {
                if (o.isDisabled(o.activeDate)) return;
                a.select(o.activeDate);
              } else
                !b.ctrlKey || ("up" !== c && "down" !== c)
                  ? (o.handleKeyDown(c, b), o.refreshView())
                  : a.toggleMode("up" === c ? 1 : -1);
          }),
          b.on("keydown", function(b) {
            a.$apply(function() {
              a.keydown(b);
            });
          }),
          a.$on("$destroy", function() {
            for (; r.length; ) r.shift()();
          });
      }
    ])
    .controller("UibDaypickerController", [
      "$scope",
      "$element",
      "dateFilter",
      function(a, b, c) {
        function d(a, b) {
          return 1 !== b || a % 4 !== 0 || (a % 100 === 0 && a % 400 !== 0)
            ? f[b]
            : 29;
        }
        function e(a) {
          var b = new Date(a);
          b.setDate(b.getDate() + 4 - (b.getDay() || 7));
          var c = b.getTime();
          return (
            b.setMonth(0),
            b.setDate(1),
            Math.floor(Math.round((c - b) / 864e5) / 7) + 1
          );
        }
        var f = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        (this.step = { months: 1 }),
          (this.element = b),
          (this.init = function(b) {
            angular.extend(b, this),
              (a.showWeeks = b.showWeeks),
              b.refreshView();
          }),
          (this.getDates = function(a, b) {
            for (var c, d = new Array(b), e = new Date(a), f = 0; f < b; )
              (c = new Date(e)), (d[f++] = c), e.setDate(e.getDate() + 1);
            return d;
          }),
          (this._refreshView = function() {
            var b = this.activeDate.getFullYear(),
              d = this.activeDate.getMonth(),
              f = new Date(this.activeDate);
            f.setFullYear(b, d, 1);
            var g = this.startingDay - f.getDay(),
              h = g > 0 ? 7 - g : -g,
              i = new Date(f);
            h > 0 && i.setDate(-h + 1);
            for (var j = this.getDates(i, 42), k = 0; k < 42; k++)
              j[k] = angular.extend(
                this.createDateObject(j[k], this.formatDay),
                { secondary: j[k].getMonth() !== d, uid: a.uniqueId + "-" + k }
              );
            a.labels = new Array(7);
            for (var l = 0; l < 7; l++)
              a.labels[l] = {
                abbr: c(j[l].date, this.formatDayHeader),
                full: c(j[l].date, "EEEE")
              };
            if (
              ((a.title = c(this.activeDate, this.formatDayTitle)),
              (a.rows = this.split(j, 7)),
              a.showWeeks)
            ) {
              a.weekNumbers = [];
              for (
                var m = (11 - this.startingDay) % 7, n = a.rows.length, o = 0;
                o < n;
                o++
              )
                a.weekNumbers.push(e(a.rows[o][m].date));
            }
          }),
          (this.compare = function(a, b) {
            var c = new Date(a.getFullYear(), a.getMonth(), a.getDate()),
              d = new Date(b.getFullYear(), b.getMonth(), b.getDate());
            return (
              c.setFullYear(a.getFullYear()),
              d.setFullYear(b.getFullYear()),
              c - d
            );
          }),
          (this.handleKeyDown = function(a, b) {
            var c = this.activeDate.getDate();
            if ("left" === a) c -= 1;
            else if ("up" === a) c -= 7;
            else if ("right" === a) c += 1;
            else if ("down" === a) c += 7;
            else if ("pageup" === a || "pagedown" === a) {
              var e = this.activeDate.getMonth() + ("pageup" === a ? -1 : 1);
              this.activeDate.setMonth(e, 1),
                (c = Math.min(
                  d(this.activeDate.getFullYear(), this.activeDate.getMonth()),
                  c
                ));
            } else
              "home" === a
                ? (c = 1)
                : "end" === a &&
                  (c = d(
                    this.activeDate.getFullYear(),
                    this.activeDate.getMonth()
                  ));
            this.activeDate.setDate(c);
          });
      }
    ])
    .controller("UibMonthpickerController", [
      "$scope",
      "$element",
      "dateFilter",
      function(a, b, c) {
        (this.step = { years: 1 }),
          (this.element = b),
          (this.init = function(a) {
            angular.extend(a, this), a.refreshView();
          }),
          (this._refreshView = function() {
            for (
              var b,
                d = new Array(12),
                e = this.activeDate.getFullYear(),
                f = 0;
              f < 12;
              f++
            )
              (b = new Date(this.activeDate)),
                b.setFullYear(e, f, 1),
                (d[f] = angular.extend(
                  this.createDateObject(b, this.formatMonth),
                  { uid: a.uniqueId + "-" + f }
                ));
            (a.title = c(this.activeDate, this.formatMonthTitle)),
              (a.rows = this.split(d, this.monthColumns)),
              (a.yearHeaderColspan =
                this.monthColumns > 3 ? this.monthColumns - 2 : 1);
          }),
          (this.compare = function(a, b) {
            var c = new Date(a.getFullYear(), a.getMonth()),
              d = new Date(b.getFullYear(), b.getMonth());
            return (
              c.setFullYear(a.getFullYear()),
              d.setFullYear(b.getFullYear()),
              c - d
            );
          }),
          (this.handleKeyDown = function(a, b) {
            var c = this.activeDate.getMonth();
            if ("left" === a) c -= 1;
            else if ("up" === a) c -= this.monthColumns;
            else if ("right" === a) c += 1;
            else if ("down" === a) c += this.monthColumns;
            else if ("pageup" === a || "pagedown" === a) {
              var d = this.activeDate.getFullYear() + ("pageup" === a ? -1 : 1);
              this.activeDate.setFullYear(d);
            } else "home" === a ? (c = 0) : "end" === a && (c = 11);
            this.activeDate.setMonth(c);
          });
      }
    ])
    .controller("UibYearpickerController", [
      "$scope",
      "$element",
      "dateFilter",
      function(a, b, c) {
        function d(a) {
          return parseInt((a - 1) / f, 10) * f + 1;
        }
        var e, f;
        (this.element = b),
          (this.yearpickerInit = function() {
            (e = this.yearColumns),
              (f = this.yearRows * e),
              (this.step = { years: f });
          }),
          (this._refreshView = function() {
            for (
              var b,
                c = new Array(f),
                g = 0,
                h = d(this.activeDate.getFullYear());
              g < f;
              g++
            )
              (b = new Date(this.activeDate)),
                b.setFullYear(h + g, 0, 1),
                (c[g] = angular.extend(
                  this.createDateObject(b, this.formatYear),
                  { uid: a.uniqueId + "-" + g }
                ));
            (a.title = [c[0].label, c[f - 1].label].join(" - ")),
              (a.rows = this.split(c, e)),
              (a.columns = e);
          }),
          (this.compare = function(a, b) {
            return a.getFullYear() - b.getFullYear();
          }),
          (this.handleKeyDown = function(a, b) {
            var c = this.activeDate.getFullYear();
            "left" === a
              ? (c -= 1)
              : "up" === a
                ? (c -= e)
                : "right" === a
                  ? (c += 1)
                  : "down" === a
                    ? (c += e)
                    : "pageup" === a || "pagedown" === a
                      ? (c += ("pageup" === a ? -1 : 1) * f)
                      : "home" === a
                        ? (c = d(this.activeDate.getFullYear()))
                        : "end" === a &&
                          (c = d(this.activeDate.getFullYear()) + f - 1),
              this.activeDate.setFullYear(c);
          });
      }
    ])
    .directive("uibDatepicker", function() {
      return {
        templateUrl: function(a, b) {
          return b.templateUrl || "uib/template/datepicker/datepicker.html";
        },
        scope: { datepickerOptions: "=?" },
        require: ["uibDatepicker", "^ngModel"],
        restrict: "A",
        controller: "UibDatepickerController",
        controllerAs: "datepicker",
        link: function(a, b, c, d) {
          var e = d[0],
            f = d[1];
          e.init(f);
        }
      };
    })
    .directive("uibDaypicker", function() {
      return {
        templateUrl: function(a, b) {
          return b.templateUrl || "uib/template/datepicker/day.html";
        },
        require: ["^uibDatepicker", "uibDaypicker"],
        restrict: "A",
        controller: "UibDaypickerController",
        link: function(a, b, c, d) {
          var e = d[0],
            f = d[1];
          f.init(e);
        }
      };
    })
    .directive("uibMonthpicker", function() {
      return {
        templateUrl: function(a, b) {
          return b.templateUrl || "uib/template/datepicker/month.html";
        },
        require: ["^uibDatepicker", "uibMonthpicker"],
        restrict: "A",
        controller: "UibMonthpickerController",
        link: function(a, b, c, d) {
          var e = d[0],
            f = d[1];
          f.init(e);
        }
      };
    })
    .directive("uibYearpicker", function() {
      return {
        templateUrl: function(a, b) {
          return b.templateUrl || "uib/template/datepicker/year.html";
        },
        require: ["^uibDatepicker", "uibYearpicker"],
        restrict: "A",
        controller: "UibYearpickerController",
        link: function(a, b, c, d) {
          var e = d[0];
          angular.extend(e, d[1]), e.yearpickerInit(), e.refreshView();
        }
      };
    }),
  angular.module("ui.bootstrap.position", []).factory("$uibPosition", [
    "$document",
    "$window",
    function(a, b) {
      var c,
        d,
        e = { normal: /(auto|scroll)/, hidden: /(auto|scroll|hidden)/ },
        f = {
          auto: /\s?auto?\s?/i,
          primary: /^(top|bottom|left|right)$/,
          secondary: /^(top|bottom|left|right|center)$/,
          vertical: /^(top|bottom)$/
        },
        g = /(HTML|BODY)/;
      return {
        getRawNode: function(a) {
          return a.nodeName ? a : a[0] || a;
        },
        parseStyle: function(a) {
          return (a = parseFloat(a)), isFinite(a) ? a : 0;
        },
        offsetParent: function(c) {
          function d(a) {
            return "static" === (b.getComputedStyle(a).position || "static");
          }
          c = this.getRawNode(c);
          for (
            var e = c.offsetParent || a[0].documentElement;
            e && e !== a[0].documentElement && d(e);

          )
            e = e.offsetParent;
          return e || a[0].documentElement;
        },
        scrollbarWidth: function(e) {
          if (e) {
            if (angular.isUndefined(d)) {
              var f = a.find("body");
              f.addClass("uib-position-body-scrollbar-measure"),
                (d = b.innerWidth - f[0].clientWidth),
                (d = isFinite(d) ? d : 0),
                f.removeClass("uib-position-body-scrollbar-measure");
            }
            return d;
          }
          if (angular.isUndefined(c)) {
            var g = angular.element(
              '<div class="uib-position-scrollbar-measure"></div>'
            );
            a.find("body").append(g),
              (c = g[0].offsetWidth - g[0].clientWidth),
              (c = isFinite(c) ? c : 0),
              g.remove();
          }
          return c;
        },
        scrollbarPadding: function(a) {
          a = this.getRawNode(a);
          var c = b.getComputedStyle(a),
            d = this.parseStyle(c.paddingRight),
            e = this.parseStyle(c.paddingBottom),
            f = this.scrollParent(a, !1, !0),
            h = this.scrollbarWidth(g.test(f.tagName));
          return {
            scrollbarWidth: h,
            widthOverflow: f.scrollWidth > f.clientWidth,
            right: d + h,
            originalRight: d,
            heightOverflow: f.scrollHeight > f.clientHeight,
            bottom: e + h,
            originalBottom: e
          };
        },
        isScrollable: function(a, c) {
          a = this.getRawNode(a);
          var d = c ? e.hidden : e.normal,
            f = b.getComputedStyle(a);
          return d.test(f.overflow + f.overflowY + f.overflowX);
        },
        scrollParent: function(c, d, f) {
          c = this.getRawNode(c);
          var g = d ? e.hidden : e.normal,
            h = a[0].documentElement,
            i = b.getComputedStyle(c);
          if (f && g.test(i.overflow + i.overflowY + i.overflowX)) return c;
          var j = "absolute" === i.position,
            k = c.parentElement || h;
          if (k === h || "fixed" === i.position) return h;
          for (; k.parentElement && k !== h; ) {
            var l = b.getComputedStyle(k);
            if (
              (j && "static" !== l.position && (j = !1),
              !j && g.test(l.overflow + l.overflowY + l.overflowX))
            )
              break;
            k = k.parentElement;
          }
          return k;
        },
        position: function(c, d) {
          c = this.getRawNode(c);
          var e = this.offset(c);
          if (d) {
            var f = b.getComputedStyle(c);
            (e.top -= this.parseStyle(f.marginTop)),
              (e.left -= this.parseStyle(f.marginLeft));
          }
          var g = this.offsetParent(c),
            h = { top: 0, left: 0 };
          return (
            g !== a[0].documentElement &&
              ((h = this.offset(g)),
              (h.top += g.clientTop - g.scrollTop),
              (h.left += g.clientLeft - g.scrollLeft)),
            {
              width: Math.round(
                angular.isNumber(e.width) ? e.width : c.offsetWidth
              ),
              height: Math.round(
                angular.isNumber(e.height) ? e.height : c.offsetHeight
              ),
              top: Math.round(e.top - h.top),
              left: Math.round(e.left - h.left)
            }
          );
        },
        offset: function(c, d) {
          c = this.getRawNode(c);
          var e = c.getBoundingClientRect(),
            f = {
              width: Math.round(
                angular.isNumber(e.width) ? e.width : c.offsetWidth
              ),
              height: Math.round(
                angular.isNumber(e.height) ? e.height : c.offsetHeight
              ),
              top: Math.round(
                e.top + (b.pageYOffset || a[0].documentElement.scrollTop)
              ),
              left: Math.round(
                e.left + (b.pageXOffset || a[0].documentElement.scrollLeft)
              )
            };
          if (d) {
            var g = window.getComputedStyle(c),
              h =
                this.parseStyle(g.marginTop) + this.parseStyle(g.marginBottom),
              i =
                this.parseStyle(g.marginLeft) + this.parseStyle(g.marginRight);
            (f.height += h), (f.width += i);
          }
          return f;
        },
        viewportOffset: function(c, d, e) {
          (c = this.getRawNode(c)), (e = e !== !1);
          var f = c.getBoundingClientRect(),
            g = { top: 0, left: 0, bottom: 0, right: 0 },
            h = d ? a[0].documentElement : this.scrollParent(c),
            i = h.getBoundingClientRect();
          if (
            ((g.top = i.top + h.clientTop),
            (g.left = i.left + h.clientLeft),
            h === a[0].documentElement &&
              ((g.top += b.pageYOffset), (g.left += b.pageXOffset)),
            (g.bottom = g.top + h.clientHeight),
            (g.right = g.left + h.clientWidth),
            e)
          ) {
            var j = b.getComputedStyle(h);
            (g.top += this.parseStyle(j.paddingTop)),
              (g.bottom -= this.parseStyle(j.paddingBottom)),
              (g.left += this.parseStyle(j.paddingLeft)),
              (g.right -= this.parseStyle(j.paddingRight));
          }
          return {
            top: Math.round(f.top - g.top),
            bottom: Math.round(g.bottom - f.bottom),
            left: Math.round(f.left - g.left),
            right: Math.round(g.right - f.right)
          };
        },
        parsePlacement: function(a) {
          var b = f.auto.test(a);
          return (
            b && (a = a.replace(f.auto, "")),
            (a = a.split("-")),
            (a[0] = a[0] || "top"),
            f.primary.test(a[0]) || (a[0] = "top"),
            (a[1] = a[1] || "center"),
            f.secondary.test(a[1]) || (a[1] = "center"),
            b ? (a[2] = !0) : (a[2] = !1),
            a
          );
        },
        positionElements: function(a, c, d, e, g) {
          (a = this.getRawNode(a)), (c = this.getRawNode(c));
          var h = angular.isDefined(c.offsetWidth)
              ? c.offsetWidth
              : c.prop("offsetWidth"),
            i = angular.isDefined(c.offsetHeight)
              ? c.offsetHeight
              : c.prop("offsetHeight");
          if (g) {
            var j = window.getComputedStyle(c),
              k =
                this.parseStyle(j.marginTop) + this.parseStyle(j.marginBottom),
              l =
                this.parseStyle(j.marginLeft) + this.parseStyle(j.marginRight);
            (i += k), (h += l);
          }
          d = this.parsePlacement(d);
          var m = e ? this.offset(a) : this.position(a),
            n = { top: 0, left: 0, placement: "" };
          if (d[2]) {
            var o = this.viewportOffset(a, e),
              p = b.getComputedStyle(c),
              q = {
                width:
                  h +
                  Math.round(
                    Math.abs(
                      this.parseStyle(p.marginLeft) +
                        this.parseStyle(p.marginRight)
                    )
                  ),
                height:
                  i +
                  Math.round(
                    Math.abs(
                      this.parseStyle(p.marginTop) +
                        this.parseStyle(p.marginBottom)
                    )
                  )
              };
            if (
              ((d[0] =
                "top" === d[0] && q.height > o.top && q.height <= o.bottom
                  ? "bottom"
                  : "bottom" === d[0] &&
                    q.height > o.bottom &&
                    q.height <= o.top
                    ? "top"
                    : "left" === d[0] && q.width > o.left && q.width <= o.right
                      ? "right"
                      : "right" === d[0] &&
                        q.width > o.right &&
                        q.width <= o.left
                        ? "left"
                        : d[0]),
              (d[1] =
                "top" === d[1] &&
                q.height - m.height > o.bottom &&
                q.height - m.height <= o.top
                  ? "bottom"
                  : "bottom" === d[1] &&
                    q.height - m.height > o.top &&
                    q.height - m.height <= o.bottom
                    ? "top"
                    : "left" === d[1] &&
                      q.width - m.width > o.right &&
                      q.width - m.width <= o.left
                      ? "right"
                      : "right" === d[1] &&
                        q.width - m.width > o.left &&
                        q.width - m.width <= o.right
                        ? "left"
                        : d[1]),
              "center" === d[1])
            )
              if (f.vertical.test(d[0])) {
                var r = m.width / 2 - h / 2;
                o.left + r < 0 && q.width - m.width <= o.right
                  ? (d[1] = "left")
                  : o.right + r < 0 &&
                    q.width - m.width <= o.left &&
                    (d[1] = "right");
              } else {
                var s = m.height / 2 - q.height / 2;
                o.top + s < 0 && q.height - m.height <= o.bottom
                  ? (d[1] = "top")
                  : o.bottom + s < 0 &&
                    q.height - m.height <= o.top &&
                    (d[1] = "bottom");
              }
          }
          switch (d[0]) {
            case "top":
              n.top = m.top - i;
              break;
            case "bottom":
              n.top = m.top + m.height;
              break;
            case "left":
              n.left = m.left - h;
              break;
            case "right":
              n.left = m.left + m.width;
          }
          switch (d[1]) {
            case "top":
              n.top = m.top;
              break;
            case "bottom":
              n.top = m.top + m.height - i;
              break;
            case "left":
              n.left = m.left;
              break;
            case "right":
              n.left = m.left + m.width - h;
              break;
            case "center":
              f.vertical.test(d[0])
                ? (n.left = m.left + m.width / 2 - h / 2)
                : (n.top = m.top + m.height / 2 - i / 2);
          }
          return (
            (n.top = Math.round(n.top)),
            (n.left = Math.round(n.left)),
            (n.placement = "center" === d[1] ? d[0] : d[0] + "-" + d[1]),
            n
          );
        },
        adjustTop: function(a, b, c, d) {
          if (a.indexOf("top") !== -1 && c !== d)
            return { top: b.top - d + "px" };
        },
        positionArrow: function(a, c) {
          a = this.getRawNode(a);
          var d = !0,
            e = a.querySelector(".tooltip-inner");
          if (!e) {
            if (!angular.element(a).hasClass("popover")) return;
            d = !1;
          }
          var g = a.querySelector(".arrow");
          if (g) {
            var h = { top: "", bottom: "", left: "", right: "" };
            if (((c = this.parsePlacement(c)), "center" === c[1])) {
              var i = this.offset(g, !0);
              if (f.vertical.test(c[0])) {
                var j = i.width / 2,
                  k = this.offset(a).width / 2,
                  l = k - j;
                h.left = "" + l + "px";
              } else {
                var m = i.height / 2,
                  n = this.offset(a).height / 2,
                  o = n - m;
                h.top = "" + o + "px";
              }
            }
            var p = "border-" + c[0] + "-width",
              q = (b.getComputedStyle(g)[p], "border-");
            (q += f.vertical.test(c[0])
              ? c[0] + "-" + c[1]
              : c[1] + "-" + c[0]),
              (q += "-radius");
            var r = b.getComputedStyle(d ? e : a)[q];
            if (d)
              switch (c[0]) {
                case "top":
                  h.bottom = "0";
                  break;
                case "bottom":
                  h.top = "0";
                  break;
                case "left":
                  h.right = "0";
                  break;
                case "right":
                  h.left = "0";
              }
            (h[c[1]] = r), angular.element(g).css(h);
          }
        }
      };
    }
  ]),
  angular
    .module("ui.bootstrap.datepickerPopup", [
      "ui.bootstrap.datepicker",
      "ui.bootstrap.position"
    ])
    .value("$datepickerPopupLiteralWarning", !0)
    .constant("uibDatepickerPopupConfig", {
      altInputFormats: [],
      appendToBody: !1,
      clearText: "Clear",
      closeOnDateSelection: !0,
      closeText: "Done",
      currentText: "Today",
      datepickerPopup: "yyyy-MM-dd",
      datepickerPopupTemplateUrl: "uib/template/datepickerPopup/popup.html",
      datepickerTemplateUrl: "uib/template/datepicker/datepicker.html",
      html5Types: {
        date: "yyyy-MM-dd",
        "datetime-local": "yyyy-MM-ddTHH:mm:ss.sss",
        month: "yyyy-MM"
      },
      onOpenFocus: !0,
      showButtonBar: !0,
      placement: "auto bottom-left"
    })
    .controller("UibDatepickerPopupController", [
      "$scope",
      "$element",
      "$attrs",
      "$compile",
      "$log",
      "$parse",
      "$window",
      "$document",
      "$rootScope",
      "$uibPosition",
      "dateFilter",
      "uibDateParser",
      "uibDatepickerPopupConfig",
      "$timeout",
      "uibDatepickerConfig",
      "$datepickerPopupLiteralWarning",
      function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
        function q(b) {
          var c = l.parse(b, x, a.date);
          if (isNaN(c))
            for (var d = 0; d < J.length; d++)
              if (((c = l.parse(b, J[d], a.date)), !isNaN(c))) return c;
          return c;
        }
        function r(a) {
          if ((angular.isNumber(a) && (a = new Date(a)), !a)) return null;
          if (angular.isDate(a) && !isNaN(a)) return a;
          if (angular.isString(a)) {
            var b = q(a);
            if (!isNaN(b)) return l.toTimezone(b, H.getOption("timezone"));
          }
          return H.getOption("allowInvalid") ? a : void 0;
        }
        function s(a, b) {
          var d = a || b;
          return (
            (!c.ngRequired && !d) ||
            (angular.isNumber(d) && (d = new Date(d)),
            !d ||
              (!(!angular.isDate(d) || isNaN(d)) ||
                (!!angular.isString(d) && !isNaN(q(d)))))
          );
        }
        function t(c) {
          if (a.isOpen || !a.disabled) {
            var d = I[0],
              e = b[0].contains(c.target),
              f = void 0 !== d.contains && d.contains(c.target);
            !a.isOpen ||
              e ||
              f ||
              a.$apply(function() {
                a.isOpen = !1;
              });
          }
        }
        function u(c) {
          27 === c.which && a.isOpen
            ? (c.preventDefault(),
              c.stopPropagation(),
              a.$apply(function() {
                a.isOpen = !1;
              }),
              b[0].focus())
            : 40 !== c.which ||
              a.isOpen ||
              (c.preventDefault(),
              c.stopPropagation(),
              a.$apply(function() {
                a.isOpen = !0;
              }));
        }
        function v() {
          if (a.isOpen) {
            var d = angular.element(
                I[0].querySelector(".uib-datepicker-popup")
              ),
              e = c.popupPlacement ? c.popupPlacement : m.placement,
              f = j.positionElements(b, d, e, z);
            d.css({ top: f.top + "px", left: f.left + "px" }),
              d.hasClass("uib-position-measure") &&
                d.removeClass("uib-position-measure");
          }
        }
        function w(a) {
          var b;
          return (
            angular.version.minor < 6
              ? ((b = angular.isObject(a.$options)
                  ? a.$options
                  : { timezone: null }),
                (b.getOption = function(a) {
                  return b[a];
                }))
              : (b = a.$options),
            b
          );
        }
        var x,
          y,
          z,
          A,
          B,
          C,
          D,
          E,
          F,
          G,
          H,
          I,
          J,
          K = !1,
          L = [];
        (this.init = function(e) {
          if (
            ((G = e),
            (H = w(G)),
            (y = angular.isDefined(c.closeOnDateSelection)
              ? a.$parent.$eval(c.closeOnDateSelection)
              : m.closeOnDateSelection),
            (z = angular.isDefined(c.datepickerAppendToBody)
              ? a.$parent.$eval(c.datepickerAppendToBody)
              : m.appendToBody),
            (A = angular.isDefined(c.onOpenFocus)
              ? a.$parent.$eval(c.onOpenFocus)
              : m.onOpenFocus),
            (B = angular.isDefined(c.datepickerPopupTemplateUrl)
              ? c.datepickerPopupTemplateUrl
              : m.datepickerPopupTemplateUrl),
            (C = angular.isDefined(c.datepickerTemplateUrl)
              ? c.datepickerTemplateUrl
              : m.datepickerTemplateUrl),
            (J = angular.isDefined(c.altInputFormats)
              ? a.$parent.$eval(c.altInputFormats)
              : m.altInputFormats),
            (a.showButtonBar = angular.isDefined(c.showButtonBar)
              ? a.$parent.$eval(c.showButtonBar)
              : m.showButtonBar),
            m.html5Types[c.type]
              ? ((x = m.html5Types[c.type]), (K = !0))
              : ((x = c.uibDatepickerPopup || m.datepickerPopup),
                c.$observe("uibDatepickerPopup", function(a, b) {
                  var c = a || m.datepickerPopup;
                  if (c !== x && ((x = c), (G.$modelValue = null), !x))
                    throw new Error(
                      "uibDatepickerPopup must have a date format specified."
                    );
                })),
            !x)
          )
            throw new Error(
              "uibDatepickerPopup must have a date format specified."
            );
          if (K && c.uibDatepickerPopup)
            throw new Error(
              "HTML5 date input types do not support custom formats."
            );
          (D = angular.element(
            "<div uib-datepicker-popup-wrap data-ng-class=\"{'show': isOpen}\"><div uib-datepicker></div></div>"
          )),
            D.attr({
              "ng-model": "date",
              "ng-change": "dateSelection(date)",
              "template-url": B
            }),
            (E = angular.element(D.children()[0])),
            E.attr("template-url", C),
            a.datepickerOptions || (a.datepickerOptions = {}),
            K &&
              "month" === c.type &&
              ((a.datepickerOptions.datepickerMode = "month"),
              (a.datepickerOptions.minMode = "month")),
            E.attr("datepicker-options", "datepickerOptions"),
            K
              ? G.$formatters.push(function(b) {
                  return (
                    (a.date = l.fromTimezone(b, H.getOption("timezone"))), b
                  );
                })
              : ((G.$$parserName = "date"),
                (G.$validators.date = s),
                G.$parsers.unshift(r),
                G.$formatters.push(function(b) {
                  return G.$isEmpty(b)
                    ? ((a.date = b), b)
                    : (angular.isNumber(b) && (b = new Date(b)),
                      (a.date = l.fromTimezone(b, H.getOption("timezone"))),
                      l.filter(a.date, x));
                })),
            G.$viewChangeListeners.push(function() {
              a.date = q(G.$viewValue);
            }),
            b.on("keydown", u),
            (I = d(D)(a)),
            D.remove(),
            z ? h.find("body").append(I) : b.after(I),
            a.$on("$destroy", function() {
              for (
                a.isOpen === !0 &&
                  (i.$$phase ||
                    a.$apply(function() {
                      a.isOpen = !1;
                    })),
                  I.remove(),
                  b.off("keydown", u),
                  h.off("click", t),
                  F && F.off("scroll", v),
                  angular.element(g).off("resize", v);
                L.length;

              )
                L.shift()();
            });
        }),
          (a.getText = function(b) {
            return a[b + "Text"] || m[b + "Text"];
          }),
          (a.isDisabled = function(b) {
            "today" === b &&
              (b = l.fromTimezone(new Date(), H.getOption("timezone")));
            var c = {};
            return (
              angular.forEach(["minDate", "maxDate"], function(b) {
                a.datepickerOptions[b]
                  ? angular.isDate(a.datepickerOptions[b])
                    ? (c[b] = new Date(a.datepickerOptions[b]))
                    : (p &&
                        e.warn(
                          "Literal date support has been deprecated, please switch to date object usage"
                        ),
                      (c[b] = new Date(k(a.datepickerOptions[b], "medium"))))
                  : (c[b] = null);
              }),
              (a.datepickerOptions &&
                c.minDate &&
                a.compare(b, c.minDate) < 0) ||
                (c.maxDate && a.compare(b, c.maxDate) > 0)
            );
          }),
          (a.compare = function(a, b) {
            return (
              new Date(a.getFullYear(), a.getMonth(), a.getDate()) -
              new Date(b.getFullYear(), b.getMonth(), b.getDate())
            );
          }),
          (a.dateSelection = function(c) {
            a.date = c;
            var d = a.date ? l.filter(a.date, x) : null;
            b.val(d), G.$setViewValue(d), y && ((a.isOpen = !1), b[0].focus());
          }),
          (a.keydown = function(c) {
            27 === c.which &&
              (c.stopPropagation(), (a.isOpen = !1), b[0].focus());
          }),
          (a.select = function(b, c) {
            if ((c.stopPropagation(), "today" === b)) {
              var d = new Date();
              angular.isDate(a.date)
                ? ((b = new Date(a.date)),
                  b.setFullYear(d.getFullYear(), d.getMonth(), d.getDate()))
                : ((b = l.fromTimezone(d, H.getOption("timezone"))),
                  b.setHours(0, 0, 0, 0));
            }
            a.dateSelection(b);
          }),
          (a.close = function(c) {
            c.stopPropagation(), (a.isOpen = !1), b[0].focus();
          }),
          (a.disabled = angular.isDefined(c.disabled) || !1),
          c.ngDisabled &&
            L.push(
              a.$parent.$watch(f(c.ngDisabled), function(b) {
                a.disabled = b;
              })
            ),
          a.$watch("isOpen", function(d) {
            d
              ? a.disabled
                ? (a.isOpen = !1)
                : n(
                    function() {
                      v(),
                        A && a.$broadcast("uib:datepicker.focus"),
                        h.on("click", t);
                      var d = c.popupPlacement ? c.popupPlacement : m.placement;
                      z || j.parsePlacement(d)[2]
                        ? ((F = F || angular.element(j.scrollParent(b))),
                          F && F.on("scroll", v))
                        : (F = null),
                        angular.element(g).on("resize", v);
                    },
                    0,
                    !1
                  )
              : (h.off("click", t),
                F && F.off("scroll", v),
                angular.element(g).off("resize", v));
          }),
          a.$on("uib:datepicker.mode", function() {
            n(v, 0, !1);
          });
      }
    ])
    .directive("uibDatepickerPopup", function() {
      return {
        require: ["ngModel", "uibDatepickerPopup"],
        controller: "UibDatepickerPopupController",
        scope: {
          datepickerOptions: "=?",
          isOpen: "=?",
          currentText: "@",
          clearText: "@",
          closeText: "@"
        },
        link: function(a, b, c, d) {
          var e = d[0],
            f = d[1];
          f.init(e);
        }
      };
    })
    .directive("uibDatepickerPopupWrap", function() {
      return {
        restrict: "A",
        transclude: !0,
        templateUrl: function(a, b) {
          return b.templateUrl || "uib/template/datepickerPopup/popup.html";
        }
      };
    }),
  angular.module("ui.bootstrap.debounce", []).factory("$$debounce", [
    "$timeout",
    function(a) {
      return function(b, c) {
        var d;
        return function() {
          var e = this,
            f = Array.prototype.slice.call(arguments);
          d && a.cancel(d),
            (d = a(function() {
              b.apply(e, f);
            }, c));
        };
      };
    }
  ]),
  angular.module("ui.bootstrap.multiMap", []).factory("$$multiMap", function() {
    return {
      createNew: function() {
        var a = {};
        return {
          entries: function() {
            return Object.keys(a).map(function(b) {
              return { key: b, value: a[b] };
            });
          },
          get: function(b) {
            return a[b];
          },
          hasKey: function(b) {
            return !!a[b];
          },
          keys: function() {
            return Object.keys(a);
          },
          put: function(b, c) {
            a[b] || (a[b] = []), a[b].push(c);
          },
          remove: function(b, c) {
            var d = a[b];
            if (d) {
              var e = d.indexOf(c);
              e !== -1 && d.splice(e, 1), d.length || delete a[b];
            }
          }
        };
      }
    };
  }),
  angular
    .module("ui.bootstrap.dropdown", [
      "ui.bootstrap.multiMap",
      "ui.bootstrap.position"
    ])
    .constant("uibDropdownConfig", {
      appendToOpenClass: "uib-dropdown-open",
      openClass: "show"
    })
    .service("uibDropdownService", [
      "$document",
      "$rootScope",
      "$$multiMap",
      function(a, b, c) {
        var d = null,
          e = c.createNew();
        (this.isOnlyOpen = function(a, b) {
          var c = e.get(b);
          if (c) {
            var d = c.reduce(function(b, c) {
              return c.scope === a ? c : b;
            }, {});
            if (d) return 1 === c.length;
          }
          return !1;
        }),
          (this.open = function(b, c, g) {
            if (
              (d || a.on("click", f),
              d && d !== b && (d.isOpen = !1),
              (d = b),
              g)
            ) {
              var h = e.get(g);
              if (h) {
                var i = h.map(function(a) {
                  return a.scope;
                });
                i.indexOf(b) === -1 && e.put(g, { scope: b });
              } else e.put(g, { scope: b });
            }
          }),
          (this.close = function(b, c, g) {
            if (
              (d === b &&
                (a.off("click", f),
                a.off("keydown", this.keybindFilter),
                (d = null)),
              g)
            ) {
              var h = e.get(g);
              if (h) {
                var i = h.reduce(function(a, c) {
                  return c.scope === b ? c : a;
                }, {});
                i && e.remove(g, i);
              }
            }
          });
        var f = function(a) {
          if (
            d &&
            d.isOpen &&
            !((a && "disabled" === d.getAutoClose()) || (a && 3 === a.which))
          ) {
            var c = d.getToggleElement();
            if (!(a && c && c[0].contains(a.target))) {
              var e = d.getDropdownElement();
              (a &&
                "outsideClick" === d.getAutoClose() &&
                e &&
                e[0].contains(a.target)) ||
                ((d.isOpen = !1), b.$$phase || d.$apply());
            }
          }
        };
        this.keybindFilter = function(a) {
          if (d) {
            var b = d.getDropdownElement(),
              c = d.getToggleElement(),
              e = b && b[0].contains(a.target),
              g = c && c[0].contains(a.target);
            27 === a.which
              ? (a.stopPropagation(), d.focusToggleElement(), f())
              : d.isKeynavEnabled() &&
                [38, 40].indexOf(a.which) !== -1 &&
                d.isOpen &&
                (e || g) &&
                (a.preventDefault(),
                a.stopPropagation(),
                d.focusDropdownEntry(a.which));
          }
        };
      }
    ])
    .controller("UibDropdownController", [
      "$scope",
      "$element",
      "$attrs",
      "$parse",
      "uibDropdownConfig",
      "uibDropdownService",
      "$animate",
      "$uibPosition",
      "$document",
      "$compile",
      "$templateRequest",
      function(a, b, c, d, e, f, g, h, i, j, k) {
        function l() {
          b.append(o.dropdownMenu);
        }
        var m,
          n,
          o = this,
          p = a.$new(),
          q = e.appendToOpenClass,
          r = e.openClass,
          s = angular.noop,
          t = c.onToggle ? d(c.onToggle) : angular.noop,
          u = !1,
          v = i.find("body");
        b.addClass("dropdown"),
          (this.init = function() {
            c.isOpen &&
              ((n = d(c.isOpen)),
              (s = n.assign),
              a.$watch(n, function(a) {
                p.isOpen = !!a;
              })),
              (u = angular.isDefined(c.keyboardNav));
          }),
          (this.toggle = function(a) {
            return (
              (p.isOpen = arguments.length ? !!a : !p.isOpen),
              angular.isFunction(s) && s(p, p.isOpen),
              p.isOpen
            );
          }),
          (this.isOpen = function() {
            return p.isOpen;
          }),
          (p.getToggleElement = function() {
            return o.toggleElement;
          }),
          (p.getAutoClose = function() {
            return c.autoClose || "always";
          }),
          (p.getElement = function() {
            return b;
          }),
          (p.isKeynavEnabled = function() {
            return u;
          }),
          (p.focusDropdownEntry = function(a) {
            var c = o.dropdownMenu
              ? angular.element(o.dropdownMenu).find(".dropdown-item")
              : b
                  .find("div")
                  .eq(0)
                  .find("a.");
            switch (a) {
              case 40:
                angular.isNumber(o.selectedOption)
                  ? (o.selectedOption =
                      o.selectedOption === c.length - 1
                        ? o.selectedOption
                        : o.selectedOption + 1)
                  : (o.selectedOption = 0);
                break;
              case 38:
                angular.isNumber(o.selectedOption)
                  ? (o.selectedOption =
                      0 === o.selectedOption ? 0 : o.selectedOption - 1)
                  : (o.selectedOption = c.length - 1);
            }
            c[o.selectedOption].focus();
          }),
          (p.getDropdownElement = function() {
            return o.dropdownMenu;
          }),
          (p.focusToggleElement = function() {
            o.toggleElement && o.toggleElement[0].focus();
          }),
          p.$watch("isOpen", function(e, n) {
            var u = null,
              w = !1;
            if (angular.isDefined(c.dropdownAppendTo)) {
              var x = d(c.dropdownAppendTo)(p);
              x && (u = angular.element(x));
            }
            if (angular.isDefined(c.dropdownAppendToBody)) {
              var y = d(c.dropdownAppendToBody)(p);
              y !== !1 && (w = !0);
            }
            if (
              (w && !u && (u = v),
              u &&
                o.dropdownMenu &&
                (e
                  ? (u.append(o.dropdownMenu), b.on("$destroy", l))
                  : (b.off("$destroy", l), l())),
              u && o.dropdownMenu)
            ) {
              var z,
                A,
                B,
                C = h.positionElements(b, o.dropdownMenu, "bottom-left", !0),
                D = 0;
              if (
                ((z = { top: C.top + "px", display: e ? "block" : "none" }),
                (A = o.dropdownMenu.hasClass("dropdown-menu-right")),
                A
                  ? ((z.left = "auto"),
                    (B = h.scrollbarPadding(u)),
                    B.heightOverflow &&
                      B.scrollbarWidth &&
                      (D = B.scrollbarWidth),
                    (z.right =
                      window.innerWidth -
                      D -
                      (C.left + b.prop("offsetWidth")) +
                      "px"))
                  : ((z.left = C.left + "px"), (z.right = "auto")),
                !w)
              ) {
                var E = h.offset(u);
                (z.top = C.top - E.top + "px"),
                  A
                    ? (z.right =
                        window.innerWidth -
                        (C.left - E.left + b.prop("offsetWidth")) +
                        "px")
                    : (z.left = C.left - E.left + "px");
              }
              o.dropdownMenu.css(z);
            }
            var F = u
                ? u
                : angular.element(b[0].querySelector("[uib-dropdown-menu]")),
              G = u ? q : r,
              H = F.hasClass(G),
              I = f.isOnlyOpen(a, u);
            if (H === !e) {
              var J;
              (J = u
                ? I
                  ? "removeClass"
                  : "addClass"
                : e
                  ? "addClass"
                  : "removeClass"),
                g[J](b, G),
                g[J](F, G).then(function() {
                  angular.isDefined(e) && e !== n && t(a, { open: !!e });
                });
            }
            if (e)
              o.dropdownMenuTemplateUrl
                ? k(o.dropdownMenuTemplateUrl).then(function(a) {
                    (m = p.$new()),
                      j(a.trim())(m, function(a) {
                        var b = a;
                        o.dropdownMenu.replaceWith(b),
                          (o.dropdownMenu = b),
                          g.addClass(o.dropdownMenu, G),
                          i.on("keydown", f.keybindFilter);
                      });
                  })
                : i.on("keydown", f.keybindFilter),
                p.focusToggleElement(),
                f.open(p, b, u);
            else {
              if ((f.close(p, b, u), o.dropdownMenuTemplateUrl)) {
                m && m.$destroy();
                var K = angular.element('<div class="dropdown-menu"></div>');
                o.dropdownMenu.replaceWith(K), (o.dropdownMenu = K);
              }
              o.selectedOption = null;
            }
            angular.isFunction(s) && s(a, e);
          });
      }
    ])
    .directive("uibDropdown", function() {
      return {
        controller: "UibDropdownController",
        link: function(a, b, c, d) {
          d.init();
        }
      };
    })
    .directive("uibDropdownMenu", function() {
      return {
        restrict: "A",
        require: "?^uibDropdown",
        link: function(a, b, c, d) {
          if (d && !angular.isDefined(c.dropdownNested)) {
            b.addClass("dropdown-menu");
            var e = c.templateUrl;
            e && (d.dropdownMenuTemplateUrl = e),
              d.dropdownMenu || (d.dropdownMenu = b);
          }
        }
      };
    })
    .directive("uibDropdownToggle", function() {
      return {
        require: "?^uibDropdown",
        link: function(a, b, c, d) {
          if (d) {
            b.addClass("dropdown-toggle"), (d.toggleElement = b);
            var e = function(e) {
              e.preventDefault(),
                b.hasClass("disabled") ||
                  c.disabled ||
                  a.$apply(function() {
                    d.toggle();
                  });
            };
            b.on("click", e);
            var f = function(e) {
              40 !== e.which ||
                d.isOpen() ||
                (e.preventDefault(),
                e.stopPropagation(),
                b.hasClass("disabled") ||
                  c.disabled ||
                  a.$apply(function() {
                    d.toggle();
                  }));
            };
            b.on("keydown", f),
              b.attr({ "aria-haspopup": !0, "aria-expanded": !1 }),
              a.$watch(d.isOpen, function(a) {
                b.attr("aria-expanded", !!a);
              }),
              a.$on("$destroy", function() {
                b.off("click", e), b.off("keydown", f);
              });
          }
        }
      };
    }),
  angular
    .module("ui.bootstrap.stackedMap", [])
    .factory("$$stackedMap", function() {
      return {
        createNew: function() {
          var a = [];
          return {
            add: function(b, c) {
              a.push({ key: b, value: c });
            },
            get: function(b) {
              for (var c = 0; c < a.length; c++)
                if (b === a[c].key) return a[c];
            },
            keys: function() {
              for (var b = [], c = 0; c < a.length; c++) b.push(a[c].key);
              return b;
            },
            top: function() {
              return a[a.length - 1];
            },
            remove: function(b) {
              for (var c = -1, d = 0; d < a.length; d++)
                if (b === a[d].key) {
                  c = d;
                  break;
                }
              return a.splice(c, 1)[0];
            },
            removeTop: function() {
              return a.pop();
            },
            length: function() {
              return a.length;
            }
          };
        }
      };
    }),
  angular
    .module("ui.bootstrap.modal", [
      "ui.bootstrap.multiMap",
      "ui.bootstrap.stackedMap",
      "ui.bootstrap.position"
    ])
    .provider("$uibResolve", function() {
      var a = this;
      (this.resolver = null),
        (this.setResolver = function(a) {
          this.resolver = a;
        }),
        (this.$get = [
          "$injector",
          "$q",
          function(b, c) {
            var d = a.resolver ? b.get(a.resolver) : null;
            return {
              resolve: function(a, e, f, g) {
                if (d) return d.resolve(a, e, f, g);
                var h = [];
                return (
                  angular.forEach(a, function(a) {
                    angular.isFunction(a) || angular.isArray(a)
                      ? h.push(c.resolve(b.invoke(a)))
                      : angular.isString(a)
                        ? h.push(c.resolve(b.get(a)))
                        : h.push(c.resolve(a));
                  }),
                  c.all(h).then(function(b) {
                    var c = {},
                      d = 0;
                    return (
                      angular.forEach(a, function(a, e) {
                        c[e] = b[d++];
                      }),
                      c
                    );
                  })
                );
              }
            };
          }
        ]);
    })
    .directive("uibModalBackdrop", [
      "$animate",
      "$injector",
      "$uibModalStack",
      function(a, b, c) {
        function d(b, d, e) {
          e.modalInClass &&
            (a.addClass(d, e.modalInClass),
            b.$on(c.NOW_CLOSING_EVENT, function(c, f) {
              var g = f();
              b.modalOptions.animation
                ? a.removeClass(d, e.modalInClass).then(g)
                : g();
            }));
        }
        return {
          restrict: "A",
          compile: function(a, b) {
            return a.addClass(b.backdropClass), d;
          }
        };
      }
    ])
    .directive("uibModalWindow", [
      "$uibModalStack",
      "$q",
      "$animateCss",
      "$document",
      function(a, b, c, d) {
        return {
          scope: { index: "@" },
          restrict: "A",
          transclude: !0,
          templateUrl: function(a, b) {
            return b.templateUrl || "uib/template/modal/window.html";
          },
          link: function(e, f, g) {
            f.addClass(g.windowTopClass || ""),
              (e.size = g.size),
              (e.close = function(b) {
                var c = a.getTop();
                c &&
                  c.value.backdrop &&
                  "static" !== c.value.backdrop &&
                  b.target === b.currentTarget &&
                  (b.preventDefault(),
                  b.stopPropagation(),
                  a.dismiss(c.key, "backdrop click"));
              }),
              f.on("click", e.close),
              (e.$isRendered = !0);
            var h = b.defer();
            e.$$postDigest(function() {
              h.resolve();
            }),
              h.promise.then(function() {
                var h = null;
                g.modalInClass &&
                  ((h = c(f, { addClass: g.modalInClass }).start()),
                  e.$on(a.NOW_CLOSING_EVENT, function(a, b) {
                    var d = b();
                    c(f, { removeClass: g.modalInClass })
                      .start()
                      .then(d);
                  })),
                  b.when(h).then(function() {
                    var b = a.getTop();
                    if (
                      (b && a.modalRendered(b.key),
                      !d[0].activeElement || !f[0].contains(d[0].activeElement))
                    ) {
                      var c = f[0].querySelector("[autofocus]");
                      c ? c.focus() : f[0].focus();
                    }
                  });
              });
          }
        };
      }
    ])
    .directive("uibModalAnimationClass", function() {
      return {
        compile: function(a, b) {
          b.modalAnimation && a.addClass(b.uibModalAnimationClass);
        }
      };
    })
    .directive("uibModalTransclude", [
      "$animate",
      function(a) {
        return {
          link: function(b, c, d, e, f) {
            f(b.$parent, function(b) {
              c.empty(), a.enter(b, c);
            });
          }
        };
      }
    ])
    .factory("$uibModalStack", [
      "$animate",
      "$animateCss",
      "$document",
      "$compile",
      "$rootScope",
      "$q",
      "$$multiMap",
      "$$stackedMap",
      "$uibPosition",
      function(a, b, c, d, e, f, g, h, i) {
        function j(a) {
          var b = "-";
          return a.replace(E, function(a, c) {
            return (c ? b : "") + a.toLowerCase();
          });
        }
        function k(a) {
          return !!(
            a.offsetWidth ||
            a.offsetHeight ||
            a.getClientRects().length
          );
        }
        function l() {
          for (var a = -1, b = x.keys(), c = 0; c < b.length; c++)
            x.get(b[c]).value.backdrop && (a = c);
          return a > -1 && a < A && (a = A), a;
        }
        function m(a, b) {
          var c = x.get(a).value,
            d = c.appendTo;
          x.remove(a),
            (B = x.top()),
            B && (A = parseInt(B.value.modalDomEl.attr("index"), 10)),
            p(
              c.modalDomEl,
              c.modalScope,
              function() {
                var b = c.openedClass || w;
                y.remove(b, a);
                var e = y.hasKey(b);
                d.toggleClass(b, e),
                  !e &&
                    v &&
                    v.heightOverflow &&
                    v.scrollbarWidth &&
                    (v.originalRight
                      ? d.css({ paddingRight: v.originalRight + "px" })
                      : d.css({ paddingRight: "" }),
                    (v = null)),
                  n(!0);
              },
              c.closedDeferred
            ),
            o(),
            b && b.focus ? b.focus() : d.focus && d.focus();
        }
        function n(a) {
          var b;
          x.length() > 0 &&
            ((b = x.top().value),
            b.modalDomEl.toggleClass(b.windowTopClass || "", a));
        }
        function o() {
          if (t && l() === -1) {
            var a = u;
            p(t, u, function() {
              a = null;
            }),
              (t = void 0),
              (u = void 0);
          }
        }
        function p(b, c, d, e) {
          function g() {
            g.done ||
              ((g.done = !0),
              a.leave(b).then(function() {
                d && d(), b.remove(), e && e.resolve();
              }),
              c.$destroy());
          }
          var h,
            i = null,
            j = function() {
              return (
                h || ((h = f.defer()), (i = h.promise)),
                function() {
                  h.resolve();
                }
              );
            };
          return c.$broadcast(z.NOW_CLOSING_EVENT, j), f.when(i).then(g);
        }
        function q(a) {
          if (a.isDefaultPrevented()) return a;
          var b = x.top();
          if (b)
            switch (a.which) {
              case 27:
                b.value.keyboard &&
                  (a.preventDefault(),
                  e.$apply(function() {
                    z.dismiss(b.key, "escape key press");
                  }));
                break;
              case 9:
                var c = z.loadFocusElementList(b),
                  d = !1;
                a.shiftKey
                  ? (z.isFocusInFirstItem(a, c) || z.isModalFocused(a, b)) &&
                    (d = z.focusLastFocusableElement(c))
                  : z.isFocusInLastItem(a, c) &&
                    (d = z.focusFirstFocusableElement(c)),
                  d && (a.preventDefault(), a.stopPropagation());
            }
        }
        function r(a, b, c) {
          return !a.value.modalScope.$broadcast("modal.closing", b, c)
            .defaultPrevented;
        }
        function s() {
          Array.prototype.forEach.call(
            document.querySelectorAll("[" + C + "]"),
            function(a) {
              var b = parseInt(a.getAttribute(C), 10),
                c = b - 1;
              a.setAttribute(C, c),
                c || (a.removeAttribute(C), a.removeAttribute("aria-hidden"));
            }
          );
        }
        var t,
          u,
          v,
          w = "modal-open",
          x = h.createNew(),
          y = g.createNew(),
          z = { NOW_CLOSING_EVENT: "modal.stack.now-closing" },
          A = 0,
          B = null,
          C = "data-bootstrap-modal-aria-hidden-count",
          D =
            "a[href], area[href], input:not([disabled]):not([tabindex='-1']), button:not([disabled]):not([tabindex='-1']),select:not([disabled]):not([tabindex='-1']), textarea:not([disabled]):not([tabindex='-1']), iframe, object, embed, *[tabindex]:not([tabindex='-1']), *[contenteditable=true]",
          E = /[A-Z]/g;
        return (
          e.$watch(l, function(a) {
            u && (u.index = a);
          }),
          c.on("keydown", q),
          e.$on("$destroy", function() {
            c.off("keydown", q);
          }),
          (z.open = function(b, f) {
            function g(a) {
              function b(a) {
                var b = a.parent() ? a.parent().children() : [];
                return Array.prototype.filter.call(b, function(b) {
                  return b !== a[0];
                });
              }
              if (a && "BODY" !== a[0].tagName)
                return (
                  b(a).forEach(function(a) {
                    var b = "true" === a.getAttribute("aria-hidden"),
                      c = parseInt(a.getAttribute(C), 10);
                    c || (c = b ? 1 : 0),
                      a.setAttribute(C, c + 1),
                      a.setAttribute("aria-hidden", "true");
                  }),
                  g(a.parent())
                );
            }
            var h = c[0].activeElement,
              k = f.openedClass || w;
            n(!1),
              (B = x.top()),
              x.add(b, {
                deferred: f.deferred,
                renderDeferred: f.renderDeferred,
                closedDeferred: f.closedDeferred,
                modalScope: f.scope,
                backdrop: f.backdrop,
                keyboard: f.keyboard,
                openedClass: f.openedClass,
                windowTopClass: f.windowTopClass,
                animation: f.animation,
                appendTo: f.appendTo
              }),
              y.put(k, b);
            var m = f.appendTo,
              o = l();
            o >= 0 &&
              !t &&
              ((u = e.$new(!0)),
              (u.modalOptions = f),
              (u.index = o),
              (t = angular.element(
                '<div uib-modal-backdrop="modal-backdrop"></div>'
              )),
              t.attr({
                class: "modal-backdrop",
                "ng-style": "{'z-index': 1040 + (index && 1 || 0) + index*10}",
                "uib-modal-animation-class": "fade",
                "modal-in-class": "show"
              }),
              f.backdropClass && t.addClass(f.backdropClass),
              f.animation && t.attr("modal-animation", "true"),
              d(t)(u),
              a.enter(t, m),
              i.isScrollable(m) &&
                ((v = i.scrollbarPadding(m)),
                v.heightOverflow &&
                  v.scrollbarWidth &&
                  m.css({ paddingRight: v.right + "px" })));
            var p;
            f.component
              ? ((p = document.createElement(j(f.component.name))),
                (p = angular.element(p)),
                p.attr({
                  resolve: "$resolve",
                  "modal-instance": "$uibModalInstance",
                  close: "$close($value)",
                  dismiss: "$dismiss($value)"
                }))
              : (p = f.content),
              (A = B ? parseInt(B.value.modalDomEl.attr("index"), 10) + 1 : 0);
            var q = angular.element(
              '<div uib-modal-window="modal-window"></div>'
            );
            q
              .attr({
                class: "modal",
                "template-url": f.windowTemplateUrl,
                "window-top-class": f.windowTopClass,
                role: "dialog",
                "aria-labelledby": f.ariaLabelledBy,
                "aria-describedby": f.ariaDescribedBy,
                size: f.size,
                index: A,
                animate: "animate",
                "ng-style":
                  "{'z-index': 1050 + $$topModalIndex*10, display: 'block'}",
                tabindex: -1,
                "uib-modal-animation-class": "fade",
                "modal-in-class": "show"
              })
              .append(p),
              f.windowClass && q.addClass(f.windowClass),
              f.animation && q.attr("modal-animation", "true"),
              m.addClass(k),
              f.scope && (f.scope.$$topModalIndex = A),
              a.enter(d(q)(f.scope), m),
              (x.top().value.modalDomEl = q),
              (x.top().value.modalOpener = h),
              g(q);
          }),
          (z.close = function(a, b) {
            var c = x.get(a);
            return (
              s(),
              c && r(c, b, !0)
                ? ((c.value.modalScope.$$uibDestructionScheduled = !0),
                  c.value.deferred.resolve(b),
                  m(a, c.value.modalOpener),
                  !0)
                : !c
            );
          }),
          (z.dismiss = function(a, b) {
            var c = x.get(a);
            return (
              s(),
              c && r(c, b, !1)
                ? ((c.value.modalScope.$$uibDestructionScheduled = !0),
                  c.value.deferred.reject(b),
                  m(a, c.value.modalOpener),
                  !0)
                : !c
            );
          }),
          (z.dismissAll = function(a) {
            for (var b = this.getTop(); b && this.dismiss(b.key, a); )
              b = this.getTop();
          }),
          (z.getTop = function() {
            return x.top();
          }),
          (z.modalRendered = function(a) {
            var b = x.get(a);
            b && b.value.renderDeferred.resolve();
          }),
          (z.focusFirstFocusableElement = function(a) {
            return a.length > 0 && (a[0].focus(), !0);
          }),
          (z.focusLastFocusableElement = function(a) {
            return a.length > 0 && (a[a.length - 1].focus(), !0);
          }),
          (z.isModalFocused = function(a, b) {
            if (a && b) {
              var c = b.value.modalDomEl;
              if (c && c.length) return (a.target || a.srcElement) === c[0];
            }
            return !1;
          }),
          (z.isFocusInFirstItem = function(a, b) {
            return b.length > 0 && (a.target || a.srcElement) === b[0];
          }),
          (z.isFocusInLastItem = function(a, b) {
            return (
              b.length > 0 && (a.target || a.srcElement) === b[b.length - 1]
            );
          }),
          (z.loadFocusElementList = function(a) {
            if (a) {
              var b = a.value.modalDomEl;
              if (b && b.length) {
                var c = b[0].querySelectorAll(D);
                return c
                  ? Array.prototype.filter.call(c, function(a) {
                      return k(a);
                    })
                  : c;
              }
            }
          }),
          z
        );
      }
    ])
    .provider("$uibModal", function() {
      var a = {
        options: { animation: !0, backdrop: !0, keyboard: !0 },
        $get: [
          "$rootScope",
          "$q",
          "$document",
          "$templateRequest",
          "$controller",
          "$uibResolve",
          "$uibModalStack",
          function(b, c, d, e, f, g, h) {
            function i(a) {
              return a.template
                ? c.when(a.template)
                : e(
                    angular.isFunction(a.templateUrl)
                      ? a.templateUrl()
                      : a.templateUrl
                  );
            }
            var j = {},
              k = null;
            return (
              (j.getPromiseChain = function() {
                return k;
              }),
              (j.open = function(e) {
                function j() {
                  return q;
                }
                var l = c.defer(),
                  m = c.defer(),
                  n = c.defer(),
                  o = c.defer(),
                  p = {
                    result: l.promise,
                    opened: m.promise,
                    closed: n.promise,
                    rendered: o.promise,
                    close: function(a) {
                      return h.close(p, a);
                    },
                    dismiss: function(a) {
                      return h.dismiss(p, a);
                    }
                  };
                if (
                  ((e = angular.extend({}, a.options, e)),
                  (e.resolve = e.resolve || {}),
                  (e.appendTo = e.appendTo || d.find("body").eq(0)),
                  !e.appendTo.length)
                )
                  throw new Error(
                    "appendTo element not found. Make sure that the element passed is in DOM."
                  );
                if (!e.component && !e.template && !e.templateUrl)
                  throw new Error(
                    "One of component or template or templateUrl options is required."
                  );
                var q;
                q = e.component
                  ? c.when(g.resolve(e.resolve, {}, null, null))
                  : c.all([i(e), g.resolve(e.resolve, {}, null, null)]);
                var r;
                return (
                  (r = k = c
                    .all([k])
                    .then(j, j)
                    .then(
                      function(a) {
                        function c(b, c, d, e) {
                          (b.$scope = g),
                            (b.$scope.$resolve = {}),
                            d
                              ? (b.$scope.$uibModalInstance = p)
                              : (b.$uibModalInstance = p);
                          var f = c ? a[1] : a;
                          angular.forEach(f, function(a, c) {
                            e && (b[c] = a), (b.$scope.$resolve[c] = a);
                          });
                        }
                        var d = e.scope || b,
                          g = d.$new();
                        (g.$close = p.close),
                          (g.$dismiss = p.dismiss),
                          g.$on("$destroy", function() {
                            g.$$uibDestructionScheduled ||
                              g.$dismiss("$uibUnscheduledDestruction");
                          });
                        var i,
                          j,
                          k = {
                            scope: g,
                            deferred: l,
                            renderDeferred: o,
                            closedDeferred: n,
                            animation: e.animation,
                            backdrop: e.backdrop,
                            keyboard: e.keyboard,
                            backdropClass: e.backdropClass,
                            windowTopClass: e.windowTopClass,
                            windowClass: e.windowClass,
                            windowTemplateUrl: e.windowTemplateUrl,
                            ariaLabelledBy: e.ariaLabelledBy,
                            ariaDescribedBy: e.ariaDescribedBy,
                            size: e.size,
                            openedClass: e.openedClass,
                            appendTo: e.appendTo
                          },
                          q = {},
                          r = {};
                        e.component
                          ? (c(q, !1, !0, !1),
                            (q.name = e.component),
                            (k.component = q))
                          : e.controller &&
                            (c(r, !0, !1, !0),
                            (j = f(e.controller, r, !0, e.controllerAs)),
                            e.controllerAs &&
                              e.bindToController &&
                              ((i = j.instance),
                              (i.$close = g.$close),
                              (i.$dismiss = g.$dismiss),
                              angular.extend(
                                i,
                                { $resolve: r.$scope.$resolve },
                                d
                              )),
                            (i = j()),
                            angular.isFunction(i.$onInit) && i.$onInit()),
                          e.component || (k.content = a[0]),
                          h.open(p, k),
                          m.resolve(!0);
                      },
                      function(a) {
                        m.reject(a), l.reject(a);
                      }
                    )
                    ["finally"](function() {
                      k === r && (k = null);
                    })),
                  p
                );
              }),
              j
            );
          }
        ]
      };
      return a;
    }),
  angular.module("ui.bootstrap.paging", []).factory("uibPaging", [
    "$parse",
    function(a) {
      return {
        create: function(b, c, d) {
          (b.setNumPages = d.numPages ? a(d.numPages).assign : angular.noop),
            (b.ngModelCtrl = { $setViewValue: angular.noop }),
            (b._watchers = []),
            (b.init = function(a, e) {
              (b.ngModelCtrl = a),
                (b.config = e),
                (a.$render = function() {
                  b.render();
                }),
                d.itemsPerPage
                  ? b._watchers.push(
                      c.$parent.$watch(d.itemsPerPage, function(a) {
                        (b.itemsPerPage = parseInt(a, 10)),
                          (c.totalPages = b.calculateTotalPages()),
                          b.updatePage();
                      })
                    )
                  : (b.itemsPerPage = e.itemsPerPage),
                c.$watch("totalItems", function(a, d) {
                  (angular.isDefined(a) || a !== d) &&
                    ((c.totalPages = b.calculateTotalPages()), b.updatePage());
                });
            }),
            (b.calculateTotalPages = function() {
              var a =
                b.itemsPerPage < 1
                  ? 1
                  : Math.ceil(c.totalItems / b.itemsPerPage);
              return Math.max(a || 0, 1);
            }),
            (b.render = function() {
              c.page = parseInt(b.ngModelCtrl.$viewValue, 10) || 1;
            }),
            (c.selectPage = function(a, d) {
              d && d.preventDefault();
              var e = !c.ngDisabled || !d;
              e &&
                c.page !== a &&
                a > 0 &&
                a <= c.totalPages &&
                (d && d.target && d.target.blur(),
                b.ngModelCtrl.$setViewValue(a),
                b.ngModelCtrl.$render());
            }),
            (c.getText = function(a) {
              return c[a + "Text"] || b.config[a + "Text"];
            }),
            (c.noPrevious = function() {
              return 1 === c.page;
            }),
            (c.noNext = function() {
              return c.page === c.totalPages;
            }),
            (b.updatePage = function() {
              b.setNumPages(c.$parent, c.totalPages),
                c.page > c.totalPages
                  ? c.selectPage(c.totalPages)
                  : b.ngModelCtrl.$render();
            }),
            c.$on("$destroy", function() {
              for (; b._watchers.length; ) b._watchers.shift()();
            });
        }
      };
    }
  ]),
  angular
    .module("ui.bootstrap.pager", [
      "ui.bootstrap.paging",
      "ui.bootstrap.tabindex"
    ])
    .controller("UibPagerController", [
      "$scope",
      "$attrs",
      "uibPaging",
      "uibPagerConfig",
      function(a, b, c, d) {
        (a.align = angular.isDefined(b.align)
          ? a.$parent.$eval(b.align)
          : d.align),
          c.create(this, a, b);
      }
    ])
    .constant("uibPagerConfig", {
      itemsPerPage: 10,
      previousText: "« Previous",
      nextText: "Next »",
      align: !0
    })
    .directive("uibPager", [
      "uibPagerConfig",
      function(a) {
        return {
          scope: {
            totalItems: "=",
            previousText: "@",
            nextText: "@",
            ngDisabled: "="
          },
          require: ["uibPager", "?ngModel"],
          restrict: "A",
          controller: "UibPagerController",
          controllerAs: "pager",
          templateUrl: function(a, b) {
            return b.templateUrl || "uib/template/pager/pager.html";
          },
          link: function(b, c, d, e) {
            c.addClass("pager");
            var f = e[0],
              g = e[1];
            g && f.init(g, a);
          }
        };
      }
    ]),
  angular
    .module("ui.bootstrap.pagination", [
      "ui.bootstrap.paging",
      "ui.bootstrap.tabindex"
    ])
    .controller("UibPaginationController", [
      "$scope",
      "$attrs",
      "$parse",
      "uibPaging",
      "uibPaginationConfig",
      function(a, b, c, d, e) {
        function f(a, b, c) {
          return { number: a, text: b, active: c };
        }
        function g(a, b) {
          var c = [],
            d = 1,
            e = b,
            g = angular.isDefined(i) && i < b;
          g &&
            (j
              ? ((d = Math.max(a - Math.floor(i / 2), 1)),
                (e = d + i - 1),
                e > b && ((e = b), (d = e - i + 1)))
              : ((d = (Math.ceil(a / i) - 1) * i + 1),
                (e = Math.min(d + i - 1, b))));
          for (var h = d; h <= e; h++) {
            var n = f(h, m(h), h === a);
            c.push(n);
          }
          if (g && i > 0 && (!j || k || l)) {
            if (d > 1) {
              if (!l || d > 3) {
                var o = f(d - 1, "...", !1);
                c.unshift(o);
              }
              if (l) {
                if (3 === d) {
                  var p = f(2, "2", !1);
                  c.unshift(p);
                }
                var q = f(1, "1", !1);
                c.unshift(q);
              }
            }
            if (e < b) {
              if (!l || e < b - 2) {
                var r = f(e + 1, "...", !1);
                c.push(r);
              }
              if (l) {
                if (e === b - 2) {
                  var s = f(b - 1, b - 1, !1);
                  c.push(s);
                }
                var t = f(b, b, !1);
                c.push(t);
              }
            }
          }
          return c;
        }
        var h = this,
          i = angular.isDefined(b.maxSize)
            ? a.$parent.$eval(b.maxSize)
            : e.maxSize,
          j = angular.isDefined(b.rotate)
            ? a.$parent.$eval(b.rotate)
            : e.rotate,
          k = angular.isDefined(b.forceEllipses)
            ? a.$parent.$eval(b.forceEllipses)
            : e.forceEllipses,
          l = angular.isDefined(b.boundaryLinkNumbers)
            ? a.$parent.$eval(b.boundaryLinkNumbers)
            : e.boundaryLinkNumbers,
          m = angular.isDefined(b.pageLabel)
            ? function(c) {
                return a.$parent.$eval(b.pageLabel, { $page: c });
              }
            : angular.identity;
        (a.boundaryLinks = angular.isDefined(b.boundaryLinks)
          ? a.$parent.$eval(b.boundaryLinks)
          : e.boundaryLinks),
          (a.directionLinks = angular.isDefined(b.directionLinks)
            ? a.$parent.$eval(b.directionLinks)
            : e.directionLinks),
          b.$set("role", "menu"),
          d.create(this, a, b),
          b.maxSize &&
            h._watchers.push(
              a.$parent.$watch(c(b.maxSize), function(a) {
                (i = parseInt(a, 10)), h.render();
              })
            );
        var n = this.render;
        this.render = function() {
          n(),
            a.page > 0 &&
              a.page <= a.totalPages &&
              (a.pages = g(a.page, a.totalPages));
        };
      }
    ])
    .constant("uibPaginationConfig", {
      itemsPerPage: 10,
      boundaryLinks: !1,
      boundaryLinkNumbers: !1,
      directionLinks: !0,
      firstText: "First",
      previousText: "Previous",
      nextText: "Next",
      lastText: "Last",
      rotate: !0,
      forceEllipses: !1
    })
    .directive("uibPagination", [
      "$parse",
      "uibPaginationConfig",
      function(a, b) {
        return {
          scope: {
            totalItems: "=",
            firstText: "@",
            previousText: "@",
            nextText: "@",
            lastText: "@",
            ngDisabled: "="
          },
          require: ["uibPagination", "?ngModel"],
          restrict: "A",
          controller: "UibPaginationController",
          controllerAs: "pagination",
          templateUrl: function(a, b) {
            return b.templateUrl || "uib/template/pagination/pagination.html";
          },
          link: function(a, c, d, e) {
            c.addClass("pagination");
            var f = e[0],
              g = e[1];
            g && f.init(g, b);
          }
        };
      }
    ]),
  angular
    .module("ui.bootstrap.tooltip", [
      "ui.bootstrap.position",
      "ui.bootstrap.stackedMap"
    ])
    .provider("$uibTooltip", function() {
      function a(a) {
        var b = /[A-Z]/g,
          c = "-";
        return a.replace(b, function(a, b) {
          return (b ? c : "") + a.toLowerCase();
        });
      }
      var b = {
          placement: "top",
          placementClassPrefix: "bs-tooltip-",
          animation: !0,
          popupDelay: 0,
          popupCloseDelay: 0,
          useContentExp: !1
        },
        c = {
          mouseenter: "mouseleave",
          click: "click",
          outsideClick: "outsideClick",
          focus: "blur",
          none: ""
        },
        d = {};
      (this.options = function(a) {
        angular.extend(d, a);
      }),
        (this.setTriggers = function(a) {
          angular.extend(c, a);
        }),
        (this.$get = [
          "$window",
          "$compile",
          "$timeout",
          "$document",
          "$uibPosition",
          "$interpolate",
          "$rootScope",
          "$parse",
          "$$stackedMap",
          function(e, f, g, h, i, j, k, l, m) {
            function n(a) {
              if (27 === a.which) {
                var b = o.top();
                b && (b.value.close(), (b = null));
              }
            }
            var o = m.createNew();
            return (
              h.on("keyup", n),
              k.$on("$destroy", function() {
                h.off("keyup", n);
              }),
              function(e, k, m, n) {
                function p(a) {
                  var b = (a || n.trigger || m).split(" "),
                    d = b.map(function(a) {
                      return c[a] || a;
                    });
                  return { show: b, hide: d };
                }
                n = angular.extend({}, b, d, n);
                var q = a(e),
                  r = j.startSymbol(),
                  s = j.endSymbol(),
                  t =
                    "<div " +
                    q +
                    '-popup uib-title="' +
                    r +
                    "title" +
                    s +
                    '" ' +
                    (n.useContentExp
                      ? 'content-exp="contentExp()" '
                      : 'content="' + r + "content" + s + '" ') +
                    'origin-scope="origScope" class="uib-position-measure ' +
                    k +
                    '" tooltip-animation-class="fade"uib-tooltip-classes ng-class="{ show: isOpen }" ></div>';
                return {
                  compile: function(a, b) {
                    var c = f(t);
                    return function(a, b, d, f) {
                      function j() {
                        P.isOpen ? q() : m();
                      }
                      function m() {
                        (O && !a.$eval(d[k + "Enable"])) ||
                          (u(),
                          x(),
                          P.popupDelay
                            ? H || (H = g(r, P.popupDelay, !1))
                            : r());
                      }
                      function q() {
                        s(),
                          P.popupCloseDelay
                            ? I || (I = g(t, P.popupCloseDelay, !1))
                            : t();
                      }
                      function r() {
                        return (
                          s(),
                          u(),
                          P.content
                            ? (v(),
                              void P.$evalAsync(function() {
                                (P.isOpen = !0), y(!0), U();
                              }))
                            : angular.noop
                        );
                      }
                      function s() {
                        H && (g.cancel(H), (H = null)),
                          J && (g.cancel(J), (J = null));
                      }
                      function t() {
                        P &&
                          P.$evalAsync(function() {
                            P &&
                              ((P.isOpen = !1),
                              y(!1),
                              P.animation ? G || (G = g(w, 150, !1)) : w());
                          });
                      }
                      function u() {
                        I && (g.cancel(I), (I = null)),
                          G && (g.cancel(G), (G = null));
                      }
                      function v() {
                        E ||
                          ((F = P.$new()),
                          (E = c(F, function(a) {
                            M ? h.find("body").append(a) : b.after(a);
                          })),
                          o.add(P, { close: t }),
                          z());
                      }
                      function w() {
                        s(),
                          u(),
                          A(),
                          E && (E.remove(), (E = null), K && g.cancel(K)),
                          o.remove(P),
                          F && (F.$destroy(), (F = null));
                      }
                      function x() {
                        (P.title = d[k + "Title"]),
                          S ? (P.content = S(a)) : (P.content = d[e]),
                          (P.popupClass = d[k + "Class"]),
                          (P.placement = angular.isDefined(d[k + "Placement"])
                            ? d[k + "Placement"]
                            : n.placement);
                        var b = i.parsePlacement(P.placement);
                        L = b[1] ? b[0] + "-" + b[1] : b[0];
                        var c = parseInt(d[k + "PopupDelay"], 10),
                          f = parseInt(d[k + "PopupCloseDelay"], 10);
                        (P.popupDelay = isNaN(c) ? n.popupDelay : c),
                          (P.popupCloseDelay = isNaN(f)
                            ? n.popupCloseDelay
                            : f);
                      }
                      function y(b) {
                        R && angular.isFunction(R.assign) && R.assign(a, b);
                      }
                      function z() {
                        (T.length = 0),
                          S
                            ? (T.push(
                                a.$watch(S, function(a) {
                                  (P.content = a), !a && P.isOpen && t();
                                })
                              ),
                              T.push(
                                F.$watch(function() {
                                  Q ||
                                    ((Q = !0),
                                    F.$$postDigest(function() {
                                      (Q = !1), P && P.isOpen && U();
                                    }));
                                })
                              ))
                            : T.push(
                                d.$observe(e, function(a) {
                                  (P.content = a), !a && P.isOpen ? t() : U();
                                })
                              ),
                          T.push(
                            d.$observe(k + "Title", function(a) {
                              (P.title = a), P.isOpen && U();
                            })
                          ),
                          T.push(
                            d.$observe(k + "Placement", function(a) {
                              (P.placement = a ? a : n.placement),
                                P.isOpen && U();
                            })
                          );
                      }
                      function A() {
                        T.length &&
                          (angular.forEach(T, function(a) {
                            a();
                          }),
                          (T.length = 0));
                      }
                      function B(a) {
                        P &&
                          P.isOpen &&
                          E &&
                          (b[0].contains(a.target) ||
                            E[0].contains(a.target) ||
                            q());
                      }
                      function C(a) {
                        27 === a.which && q();
                      }
                      function D() {
                        var c = [],
                          e = [],
                          f = a.$eval(d[k + "Trigger"]);
                        V(),
                          angular.isObject(f)
                            ? (Object.keys(f).forEach(function(a) {
                                c.push(a), e.push(f[a]);
                              }),
                              (N = { show: c, hide: e }))
                            : (N = p(f)),
                          "none" !== N.show &&
                            N.show.forEach(function(a, c) {
                              "outsideClick" === a
                                ? (b.on("click", j), h.on("click", B))
                                : a === N.hide[c]
                                  ? b.on(a, j)
                                  : a && (b.on(a, m), b.on(N.hide[c], q)),
                                b.on("keypress", C);
                            });
                      }
                      var E,
                        F,
                        G,
                        H,
                        I,
                        J,
                        K,
                        L,
                        M =
                          !!angular.isDefined(n.appendToBody) && n.appendToBody,
                        N = p(void 0),
                        O = angular.isDefined(d[k + "Enable"]),
                        P = a.$new(!0),
                        Q = !1,
                        R =
                          !!angular.isDefined(d[k + "IsOpen"]) &&
                          l(d[k + "IsOpen"]),
                        S = !!n.useContentExp && l(d[e]),
                        T = [],
                        U = function() {
                          E &&
                            E.html() &&
                            (J ||
                              (J = g(
                                function() {
                                  var a = i.parsePlacement(P.placement),
                                    c =
                                      "center" === a[1]
                                        ? a[0]
                                        : a[0] + "-" + a[1];
                                  E.hasClass(a[0]) ||
                                    (E.removeClass(L.split("-")[0]),
                                    E.addClass(a[0])),
                                    E.hasClass(n.placementClassPrefix + c) ||
                                      (E.removeClass(
                                        n.placementClassPrefix + L
                                      ),
                                      E.addClass(n.placementClassPrefix + c));
                                  var d = i.positionElements(
                                      b,
                                      E,
                                      P.placement,
                                      M,
                                      !0
                                    ),
                                    e = angular.isDefined(E.offsetHeight)
                                      ? E.offsetHeight
                                      : E.prop("offsetHeight"),
                                    f = M ? i.offset(b) : i.position(b);
                                  E.css({
                                    top: d.top + "px",
                                    left: d.left + "px"
                                  }),
                                    (K = g(
                                      function() {
                                        var b = angular.isDefined(
                                            E.offsetHeight
                                          )
                                            ? E.offsetHeight
                                            : E.prop("offsetHeight"),
                                          c = i.adjustTop(a, f, e, b);
                                        c && E.css(c), (K = null);
                                      },
                                      0,
                                      !1
                                    )),
                                    E.hasClass("uib-position-measure")
                                      ? (i.positionArrow(E, d.placement),
                                        E.removeClass("uib-position-measure"))
                                      : L !== d.placement &&
                                        i.positionArrow(E, d.placement),
                                    (L = d.placement),
                                    (J = null);
                                },
                                0,
                                !1
                              )));
                        };
                      (P.origScope = a),
                        (P.isOpen = !1),
                        (P.contentExp = function() {
                          return P.content;
                        }),
                        d.$observe("disabled", function(a) {
                          a && s(), a && P.isOpen && t();
                        }),
                        R &&
                          a.$watch(R, function(a) {
                            P && !a === P.isOpen && j();
                          });
                      var V = function() {
                        N.show.forEach(function(a) {
                          "outsideClick" === a
                            ? b.off("click", j)
                            : (b.off(a, m), b.off(a, j)),
                            b.off("keypress", C);
                        }),
                          N.hide.forEach(function(a) {
                            "outsideClick" === a
                              ? h.off("click", B)
                              : b.off(a, q);
                          });
                      };
                      D();
                      var W = a.$eval(d[k + "Animation"]);
                      P.animation = angular.isDefined(W) ? !!W : n.animation;
                      var X,
                        Y = k + "AppendToBody";
                      (X = (Y in d && void 0 === d[Y]) || a.$eval(d[Y])),
                        (M = angular.isDefined(X) ? X : M),
                        a.$on("$destroy", function() {
                          V(), w(), (P = null);
                        });
                    };
                  }
                };
              }
            );
          }
        ]);
    })
    .directive("uibTooltipTemplateTransclude", [
      "$animate",
      "$sce",
      "$compile",
      "$templateRequest",
      function(a, b, c, d) {
        return {
          link: function(e, f, g) {
            var h,
              i,
              j,
              k = e.$eval(g.tooltipTemplateTranscludeScope),
              l = 0,
              m = function() {
                i && (i.remove(), (i = null)),
                  h && (h.$destroy(), (h = null)),
                  j &&
                    (a.leave(j).then(function() {
                      i = null;
                    }),
                    (i = j),
                    (j = null));
              };
            e.$watch(
              b.parseAsResourceUrl(g.uibTooltipTemplateTransclude),
              function(b) {
                var g = ++l;
                b
                  ? (d(b, !0).then(
                      function(d) {
                        if (g === l) {
                          var e = k.$new(),
                            i = d,
                            n = c(i)(e, function(b) {
                              m(), a.enter(b, f);
                            });
                          (h = e), (j = n), h.$emit("$includeContentLoaded", b);
                        }
                      },
                      function() {
                        g === l && (m(), e.$emit("$includeContentError", b));
                      }
                    ),
                    e.$emit("$includeContentRequested", b))
                  : m();
              }
            ),
              e.$on("$destroy", m);
          }
        };
      }
    ])
    .directive("uibTooltipClasses", [
      "$uibPosition",
      function(a) {
        return {
          restrict: "A",
          link: function(b, c, d) {
            if (b.placement) {
              var e = a.parsePlacement(b.placement);
              c.addClass(e[0]);
            }
            b.popupClass && c.addClass(b.popupClass),
              b.animation && c.addClass(d.tooltipAnimationClass);
          }
        };
      }
    ])
    .directive("uibTooltipPopup", function() {
      return {
        restrict: "A",
        scope: { content: "@" },
        templateUrl: "uib/template/tooltip/tooltip-popup.html"
      };
    })
    .directive("uibTooltip", [
      "$uibTooltip",
      function(a) {
        return a("uibTooltip", "tooltip", "mouseenter");
      }
    ])
    .directive("uibTooltipTemplatePopup", function() {
      return {
        restrict: "A",
        scope: { contentExp: "&", originScope: "&" },
        templateUrl: "uib/template/tooltip/tooltip-template-popup.html"
      };
    })
    .directive("uibTooltipTemplate", [
      "$uibTooltip",
      function(a) {
        return a("uibTooltipTemplate", "tooltip", "mouseenter", {
          useContentExp: !0
        });
      }
    ])
    .directive("uibTooltipHtmlPopup", function() {
      return {
        restrict: "A",
        scope: { contentExp: "&" },
        templateUrl: "uib/template/tooltip/tooltip-html-popup.html"
      };
    })
    .directive("uibTooltipHtml", [
      "$uibTooltip",
      function(a) {
        return a("uibTooltipHtml", "tooltip", "mouseenter", {
          useContentExp: !0
        });
      }
    ]),
  angular
    .module("ui.bootstrap.popover", ["ui.bootstrap.tooltip"])
    .directive("uibPopoverTemplatePopup", function() {
      return {
        restrict: "A",
        scope: { uibTitle: "@", contentExp: "&", originScope: "&" },
        templateUrl: "uib/template/popover/popover-template.html"
      };
    })
    .directive("uibPopoverTemplate", [
      "$uibTooltip",
      function(a) {
        return a("uibPopoverTemplate", "popover", "click", {
          placementClassPrefix: "bs-popover-",
          useContentExp: !0
        });
      }
    ])
    .directive("uibPopoverHtmlPopup", function() {
      return {
        restrict: "A",
        scope: { contentExp: "&", uibTitle: "@" },
        templateUrl: "uib/template/popover/popover-html.html"
      };
    })
    .directive("uibPopoverHtml", [
      "$uibTooltip",
      function(a) {
        return a("uibPopoverHtml", "popover", "click", {
          placementClassPrefix: "bs-popover-",
          useContentExp: !0
        });
      }
    ])
    .directive("uibPopoverPopup", function() {
      return {
        restrict: "A",
        scope: { uibTitle: "@", content: "@" },
        templateUrl: "uib/template/popover/popover.html"
      };
    })
    .directive("uibPopover", [
      "$uibTooltip",
      function(a) {
        return a("uibPopover", "popover", "click", {
          placementClassPrefix: "bs-popover-"
        });
      }
    ]),
  angular
    .module("ui.bootstrap.progressbar", [])
    .constant("uibProgressConfig", { animate: !0, max: 100 })
    .controller("UibProgressController", [
      "$scope",
      "$attrs",
      "uibProgressConfig",
      function(a, b, c) {
        function d() {
          return angular.isDefined(a.maxParam) ? a.maxParam : c.max;
        }
        var e = this,
          f = angular.isDefined(b.animate)
            ? a.$parent.$eval(b.animate)
            : c.animate;
        (this.bars = []),
          (a.max = d()),
          (this.addBar = function(a, b, c) {
            f || b.css({ transition: "none" }),
              this.bars.push(a),
              (a.max = d()),
              (a.title =
                c && angular.isDefined(c.title) ? c.title : "progressbar"),
              a.$watch("value", function(b) {
                a.recalculatePercentage();
              }),
              (a.recalculatePercentage = function() {
                var b = e.bars.reduce(function(a, b) {
                  return (
                    (b.percent = +((100 * b.value) / b.max).toFixed(2)),
                    a + b.percent
                  );
                }, 0);
                b > 100 && (a.percent -= b - 100);
              }),
              a.$on("$destroy", function() {
                (b = null), e.removeBar(a);
              });
          }),
          (this.removeBar = function(a) {
            this.bars.splice(this.bars.indexOf(a), 1),
              this.bars.forEach(function(a) {
                a.recalculatePercentage();
              });
          }),
          a.$watch("maxParam", function(a) {
            e.bars.forEach(function(a) {
              (a.max = d()), a.recalculatePercentage();
            });
          });
      }
    ])
    .directive("uibProgress", function() {
      return {
        replace: !0,
        transclude: !0,
        controller: "UibProgressController",
        require: "uibProgress",
        scope: { maxParam: "=?max" },
        templateUrl: "uib/template/progressbar/progress.html"
      };
    })
    .directive("uibBar", function() {
      return {
        replace: !0,
        transclude: !0,
        require: "^uibProgress",
        scope: { value: "=", type: "@", striped: "=?" },
        templateUrl: "uib/template/progressbar/bar.html",
        link: function(a, b, c, d) {
          d.addBar(a, b, c);
        }
      };
    })
    .directive("uibProgressbar", function() {
      return {
        replace: !0,
        transclude: !0,
        controller: "UibProgressController",
        scope: { value: "=", maxParam: "=?max", type: "@", striped: "=?" },
        templateUrl: "uib/template/progressbar/progressbar.html",
        link: function(a, b, c, d) {
          d.addBar(a, angular.element(b.children()[0]), { title: c.title });
        }
      };
    }),
  angular
    .module("ui.bootstrap.rating", [])
    .constant("uibRatingConfig", {
      max: 5,
      stateOn: null,
      stateOff: null,
      enableReset: !0,
      titles: ["one", "two", "three", "four", "five"]
    })
    .controller("UibRatingController", [
      "$scope",
      "$attrs",
      "uibRatingConfig",
      function(a, b, c) {
        var d = { $setViewValue: angular.noop },
          e = this;
        (this.init = function(e) {
          (d = e),
            (d.$render = this.render),
            d.$formatters.push(function(a) {
              return (
                angular.isNumber(a) && a << 0 !== a && (a = Math.round(a)), a
              );
            }),
            (this.stateOn = angular.isDefined(b.stateOn)
              ? a.$parent.$eval(b.stateOn)
              : c.stateOn),
            (this.stateOff = angular.isDefined(b.stateOff)
              ? a.$parent.$eval(b.stateOff)
              : c.stateOff),
            (this.enableReset = angular.isDefined(b.enableReset)
              ? a.$parent.$eval(b.enableReset)
              : c.enableReset);
          var f = angular.isDefined(b.titles)
            ? a.$parent.$eval(b.titles)
            : c.titles;
          this.titles = angular.isArray(f) && f.length > 0 ? f : c.titles;
          var g = angular.isDefined(b.ratingStates)
            ? a.$parent.$eval(b.ratingStates)
            : new Array(
                angular.isDefined(b.max) ? a.$parent.$eval(b.max) : c.max
              );
          a.range = this.buildTemplateObjects(g);
        }),
          (this.buildTemplateObjects = function(a) {
            for (var b = 0, c = a.length; b < c; b++)
              a[b] = angular.extend(
                { index: b },
                {
                  stateOn: this.stateOn,
                  stateOff: this.stateOff,
                  title: this.getTitle(b)
                },
                a[b]
              );
            return a;
          }),
          (this.getTitle = function(a) {
            return a >= this.titles.length ? a + 1 : this.titles[a];
          }),
          (a.rate = function(b) {
            if (!a.readonly && b >= 0 && b <= a.range.length) {
              var c = e.enableReset && d.$viewValue === b ? 0 : b;
              d.$setViewValue(c), d.$render();
            }
          }),
          (a.enter = function(b) {
            a.readonly || (a.value = b), a.onHover({ value: b });
          }),
          (a.reset = function() {
            (a.value = d.$viewValue), a.onLeave();
          }),
          (a.onKeydown = function(b) {
            /(37|38|39|40)/.test(b.which) &&
              (b.preventDefault(),
              b.stopPropagation(),
              a.rate(a.value + (38 === b.which || 39 === b.which ? 1 : -1)));
          }),
          (this.render = function() {
            (a.value = d.$viewValue), (a.title = e.getTitle(a.value - 1));
          });
      }
    ])
    .directive("uibRating", function() {
      return {
        require: ["uibRating", "ngModel"],
        restrict: "A",
        scope: { readonly: "=?readOnly", onHover: "&", onLeave: "&" },
        controller: "UibRatingController",
        templateUrl: "uib/template/rating/rating.html",
        link: function(a, b, c, d) {
          var e = d[0],
            f = d[1];
          e.init(f);
        }
      };
    }),
  angular
    .module("ui.bootstrap.tabs", [])
    .controller("UibTabsetController", [
      "$scope",
      function(a) {
        function b(a) {
          for (var b = 0; b < d.tabs.length; b++)
            if (d.tabs[b].index === a) return b;
        }
        var c,
          d = this;
        (d.tabs = []),
          (d.select = function(a, f) {
            if (!e) {
              var g = b(c),
                h = d.tabs[g];
              if (h) {
                if (
                  (h.tab.onDeselect({ $event: f, $selectedIndex: a }),
                  f && f.isDefaultPrevented())
                )
                  return;
                h.tab.active = !1;
              }
              var i = d.tabs[a];
              i
                ? (i.tab.onSelect({ $event: f }),
                  (i.tab.active = !0),
                  (d.active = i.index),
                  (c = i.index))
                : !i && angular.isDefined(c) && ((d.active = null), (c = null));
            }
          }),
          (d.addTab = function(a) {
            if (
              (d.tabs.push({ tab: a, index: a.index }),
              d.tabs.sort(function(a, b) {
                return a.index > b.index ? 1 : a.index < b.index ? -1 : 0;
              }),
              a.index === d.active ||
                (!angular.isDefined(d.active) && 1 === d.tabs.length))
            ) {
              var c = b(a.index);
              d.select(c);
            }
          }),
          (d.removeTab = function(a) {
            for (var b, c = 0; c < d.tabs.length; c++)
              if (d.tabs[c].tab === a) {
                b = c;
                break;
              }
            if (d.tabs[b].index === d.active) {
              var e = b === d.tabs.length - 1 ? b - 1 : b + (1 % d.tabs.length);
              d.select(e);
            }
            d.tabs.splice(b, 1);
          }),
          a.$watch("tabset.active", function(a) {
            angular.isDefined(a) && a !== c && d.select(b(a));
          });
        var e;
        a.$on("$destroy", function() {
          e = !0;
        });
      }
    ])
    .directive("uibTabset", function() {
      return {
        transclude: !0,
        replace: !0,
        scope: {},
        bindToController: { active: "=?", type: "@" },
        controller: "UibTabsetController",
        controllerAs: "tabset",
        templateUrl: function(a, b) {
          return b.templateUrl || "uib/template/tabs/tabset.html";
        },
        link: function(a, b, c) {
          (a.vertical =
            !!angular.isDefined(c.vertical) && a.$parent.$eval(c.vertical)),
            (a.justified =
              !!angular.isDefined(c.justified) && a.$parent.$eval(c.justified));
        }
      };
    })
    .directive("uibTab", [
      "$parse",
      function(a) {
        return {
          require: "^uibTabset",
          replace: !0,
          templateUrl: function(a, b) {
            return b.templateUrl || "uib/template/tabs/tab.html";
          },
          transclude: !0,
          scope: {
            heading: "@",
            index: "=?",
            classes: "@?",
            onSelect: "&select",
            onDeselect: "&deselect"
          },
          controller: function() {},
          controllerAs: "tab",
          link: function(b, c, d, e, f) {
            (b.disabled = !1),
              d.disable &&
                b.$parent.$watch(a(d.disable), function(a) {
                  b.disabled = !!a;
                }),
              angular.isUndefined(d.index) &&
                (e.tabs && e.tabs.length
                  ? (b.index =
                      Math.max.apply(
                        null,
                        e.tabs.map(function(a) {
                          return a.index;
                        })
                      ) + 1)
                  : (b.index = 0)),
              angular.isUndefined(d.classes) && (b.classes = ""),
              (b.select = function(a) {
                if (!b.disabled) {
                  for (var c, d = 0; d < e.tabs.length; d++)
                    if (e.tabs[d].tab === b) {
                      c = d;
                      break;
                    }
                  e.select(c, a);
                }
              }),
              e.addTab(b),
              b.$on("$destroy", function() {
                e.removeTab(b);
              }),
              (b.$transcludeFn = f);
          }
        };
      }
    ])
    .directive("uibTabHeadingTransclude", function() {
      return {
        restrict: "A",
        require: "^uibTab",
        link: function(a, b) {
          a.$watch("headingElement", function(a) {
            a && (b.html(""), b.append(a));
          });
        }
      };
    })
    .directive("uibTabContentTransclude", function() {
      function a(a) {
        return (
          a.tagName &&
          (a.hasAttribute("uib-tab-heading") ||
            a.hasAttribute("data-uib-tab-heading") ||
            a.hasAttribute("x-uib-tab-heading") ||
            "uib-tab-heading" === a.tagName.toLowerCase() ||
            "data-uib-tab-heading" === a.tagName.toLowerCase() ||
            "x-uib-tab-heading" === a.tagName.toLowerCase() ||
            "uib:tab-heading" === a.tagName.toLowerCase())
        );
      }
      return {
        restrict: "A",
        require: "^uibTabset",
        link: function(b, c, d) {
          var e = b.$eval(d.uibTabContentTransclude).tab;
          e.$transcludeFn(e.$parent, function(b) {
            angular.forEach(b, function(b) {
              a(b) ? (e.headingElement = b) : c.append(b);
            });
          });
        }
      };
    }),
  angular
    .module("ui.bootstrap.timepicker", [])
    .constant("uibTimepickerConfig", {
      hourStep: 1,
      minuteStep: 1,
      secondStep: 1,
      showMeridian: !0,
      showSeconds: !1,
      meridians: null,
      readonlyInput: !1,
      mousewheel: !0,
      arrowkeys: !0,
      showSpinners: !0,
      templateUrl: "uib/template/timepicker/timepicker.html"
    })
    .controller("UibTimepickerController", [
      "$scope",
      "$element",
      "$attrs",
      "$parse",
      "$log",
      "$locale",
      "uibTimepickerConfig",
      function(a, b, c, d, e, f, g) {
        function h() {
          var b = +a.hours,
            c = a.showMeridian ? b > 0 && b < 13 : b >= 0 && b < 24;
          if (c && "" !== a.hours)
            return (
              a.showMeridian &&
                (12 === b && (b = 0), a.meridian === y[1] && (b += 12)),
              b
            );
        }
        function i() {
          var b = +a.minutes,
            c = b >= 0 && b < 60;
          if (c && "" !== a.minutes) return b;
        }
        function j() {
          var b = +a.seconds;
          return b >= 0 && b < 60 ? b : void 0;
        }
        function k(a, b) {
          return null === a
            ? ""
            : angular.isDefined(a) && a.toString().length < 2 && !b
              ? "0" + a
              : a.toString();
        }
        function l(a) {
          m(), x.$setViewValue(new Date(v)), n(a);
        }
        function m() {
          s && s.$setValidity("hours", !0),
            t && t.$setValidity("minutes", !0),
            u && u.$setValidity("seconds", !0),
            x.$setValidity("time", !0),
            (a.invalidHours = !1),
            (a.invalidMinutes = !1),
            (a.invalidSeconds = !1);
        }
        function n(b) {
          if (x.$modelValue) {
            var c = v.getHours(),
              d = v.getMinutes(),
              e = v.getSeconds();
            a.showMeridian && (c = 0 === c || 12 === c ? 12 : c % 12),
              (a.hours = "h" === b ? c : k(c, !z)),
              "m" !== b && (a.minutes = k(d)),
              (a.meridian = v.getHours() < 12 ? y[0] : y[1]),
              "s" !== b && (a.seconds = k(e)),
              (a.meridian = v.getHours() < 12 ? y[0] : y[1]);
          } else
            (a.hours = null),
              (a.minutes = null),
              (a.seconds = null),
              (a.meridian = y[0]);
        }
        function o(a) {
          (v = q(v, a)), l();
        }
        function p(a, b) {
          return q(a, 60 * b);
        }
        function q(a, b) {
          var c = new Date(a.getTime() + 1e3 * b),
            d = new Date(a);
          return d.setHours(c.getHours(), c.getMinutes(), c.getSeconds()), d;
        }
        function r() {
          return (
            (null === a.hours || "" === a.hours) &&
            (null === a.minutes || "" === a.minutes) &&
            (!a.showSeconds ||
              (a.showSeconds && (null === a.seconds || "" === a.seconds)))
          );
        }
        var s,
          t,
          u,
          v = new Date(),
          w = [],
          x = { $setViewValue: angular.noop },
          y = angular.isDefined(c.meridians)
            ? a.$parent.$eval(c.meridians)
            : g.meridians || f.DATETIME_FORMATS.AMPMS,
          z = !angular.isDefined(c.padHours) || a.$parent.$eval(c.padHours);
        (a.tabindex = angular.isDefined(c.tabindex) ? c.tabindex : 0),
          b.removeAttr("tabindex"),
          (this.init = function(b, d) {
            (x = b),
              (x.$render = this.render),
              x.$formatters.unshift(function(a) {
                return a ? new Date(a) : null;
              });
            var e = d.eq(0),
              f = d.eq(1),
              h = d.eq(2);
            (s = e.controller("ngModel")),
              (t = f.controller("ngModel")),
              (u = h.controller("ngModel"));
            var i = angular.isDefined(c.mousewheel)
              ? a.$parent.$eval(c.mousewheel)
              : g.mousewheel;
            i && this.setupMousewheelEvents(e, f, h);
            var j = angular.isDefined(c.arrowkeys)
              ? a.$parent.$eval(c.arrowkeys)
              : g.arrowkeys;
            j && this.setupArrowkeyEvents(e, f, h),
              (a.readonlyInput = angular.isDefined(c.readonlyInput)
                ? a.$parent.$eval(c.readonlyInput)
                : g.readonlyInput),
              this.setupInputEvents(e, f, h);
          });
        var A = g.hourStep;
        c.hourStep &&
          w.push(
            a.$parent.$watch(d(c.hourStep), function(a) {
              A = +a;
            })
          );
        var B = g.minuteStep;
        c.minuteStep &&
          w.push(
            a.$parent.$watch(d(c.minuteStep), function(a) {
              B = +a;
            })
          );
        var C;
        w.push(
          a.$parent.$watch(d(c.min), function(a) {
            var b = new Date(a);
            C = isNaN(b) ? void 0 : b;
          })
        );
        var D;
        w.push(
          a.$parent.$watch(d(c.max), function(a) {
            var b = new Date(a);
            D = isNaN(b) ? void 0 : b;
          })
        );
        var E = !1;
        c.ngDisabled &&
          w.push(
            a.$parent.$watch(d(c.ngDisabled), function(a) {
              E = a;
            })
          ),
          (a.noIncrementHours = function() {
            var a = p(v, 60 * A);
            return E || a > D || (a < v && a < C);
          }),
          (a.noDecrementHours = function() {
            var a = p(v, 60 * -A);
            return E || a < C || (a > v && a > D);
          }),
          (a.noIncrementMinutes = function() {
            var a = p(v, B);
            return E || a > D || (a < v && a < C);
          }),
          (a.noDecrementMinutes = function() {
            var a = p(v, -B);
            return E || a < C || (a > v && a > D);
          }),
          (a.noIncrementSeconds = function() {
            var a = q(v, F);
            return E || a > D || (a < v && a < C);
          }),
          (a.noDecrementSeconds = function() {
            var a = q(v, -F);
            return E || a < C || (a > v && a > D);
          }),
          (a.noToggleMeridian = function() {
            return v.getHours() < 12 ? E || p(v, 720) > D : E || p(v, -720) < C;
          });
        var F = g.secondStep;
        c.secondStep &&
          w.push(
            a.$parent.$watch(d(c.secondStep), function(a) {
              F = +a;
            })
          ),
          (a.showSeconds = g.showSeconds),
          c.showSeconds &&
            w.push(
              a.$parent.$watch(d(c.showSeconds), function(b) {
                a.showSeconds = !!b;
              })
            ),
          (a.showMeridian = g.showMeridian),
          c.showMeridian &&
            w.push(
              a.$parent.$watch(d(c.showMeridian), function(b) {
                if (((a.showMeridian = !!b), x.$error.time)) {
                  var c = h(),
                    d = i();
                  angular.isDefined(c) &&
                    angular.isDefined(d) &&
                    (v.setHours(c), l());
                } else n();
              })
            ),
          (this.setupMousewheelEvents = function(b, c, d) {
            var e = function(a) {
              a.originalEvent && (a = a.originalEvent);
              var b = a.wheelDelta ? a.wheelDelta : -a.deltaY;
              return a.detail || b > 0;
            };
            b.on("mousewheel wheel", function(b) {
              E || a.$apply(e(b) ? a.incrementHours() : a.decrementHours()),
                b.preventDefault();
            }),
              c.on("mousewheel wheel", function(b) {
                E ||
                  a.$apply(e(b) ? a.incrementMinutes() : a.decrementMinutes()),
                  b.preventDefault();
              }),
              d.on("mousewheel wheel", function(b) {
                E ||
                  a.$apply(e(b) ? a.incrementSeconds() : a.decrementSeconds()),
                  b.preventDefault();
              });
          }),
          (this.setupArrowkeyEvents = function(b, c, d) {
            b.on("keydown", function(b) {
              E ||
                (38 === b.which
                  ? (b.preventDefault(), a.incrementHours(), a.$apply())
                  : 40 === b.which &&
                    (b.preventDefault(), a.decrementHours(), a.$apply()));
            }),
              c.on("keydown", function(b) {
                E ||
                  (38 === b.which
                    ? (b.preventDefault(), a.incrementMinutes(), a.$apply())
                    : 40 === b.which &&
                      (b.preventDefault(), a.decrementMinutes(), a.$apply()));
              }),
              d.on("keydown", function(b) {
                E ||
                  (38 === b.which
                    ? (b.preventDefault(), a.incrementSeconds(), a.$apply())
                    : 40 === b.which &&
                      (b.preventDefault(), a.decrementSeconds(), a.$apply()));
              });
          }),
          (this.setupInputEvents = function(b, c, d) {
            if (a.readonlyInput)
              return (
                (a.updateHours = angular.noop),
                (a.updateMinutes = angular.noop),
                void (a.updateSeconds = angular.noop)
              );
            var e = function(b, c, d) {
              x.$setViewValue(null),
                x.$setValidity("time", !1),
                angular.isDefined(b) &&
                  ((a.invalidHours = b), s && s.$setValidity("hours", !1)),
                angular.isDefined(c) &&
                  ((a.invalidMinutes = c), t && t.$setValidity("minutes", !1)),
                angular.isDefined(d) &&
                  ((a.invalidSeconds = d), u && u.$setValidity("seconds", !1));
            };
            (a.updateHours = function() {
              var a = h(),
                b = i();
              x.$setDirty(),
                angular.isDefined(a) && angular.isDefined(b)
                  ? (v.setHours(a),
                    v.setMinutes(b),
                    v < C || v > D ? e(!0) : l("h"))
                  : e(!0);
            }),
              b.on("blur", function(b) {
                x.$setTouched(),
                  r()
                    ? m()
                    : null === a.hours || "" === a.hours
                      ? e(!0)
                      : !a.invalidHours &&
                        a.hours < 10 &&
                        a.$apply(function() {
                          a.hours = k(a.hours, !z);
                        });
              }),
              (a.updateMinutes = function() {
                var a = i(),
                  b = h();
                x.$setDirty(),
                  angular.isDefined(a) && angular.isDefined(b)
                    ? (v.setHours(b),
                      v.setMinutes(a),
                      v < C || v > D ? e(void 0, !0) : l("m"))
                    : e(void 0, !0);
              }),
              c.on("blur", function(b) {
                x.$setTouched(),
                  r()
                    ? m()
                    : null === a.minutes
                      ? e(void 0, !0)
                      : !a.invalidMinutes &&
                        a.minutes < 10 &&
                        a.$apply(function() {
                          a.minutes = k(a.minutes);
                        });
              }),
              (a.updateSeconds = function() {
                var a = j();
                x.$setDirty(),
                  angular.isDefined(a)
                    ? (v.setSeconds(a), l("s"))
                    : e(void 0, void 0, !0);
              }),
              d.on("blur", function(b) {
                r()
                  ? m()
                  : !a.invalidSeconds &&
                    a.seconds < 10 &&
                    a.$apply(function() {
                      a.seconds = k(a.seconds);
                    });
              });
          }),
          (this.render = function() {
            var b = x.$viewValue;
            isNaN(b)
              ? (x.$setValidity("time", !1),
                e.error(
                  'Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.'
                ))
              : (b && (v = b),
                v < C || v > D
                  ? (x.$setValidity("time", !1),
                    (a.invalidHours = !0),
                    (a.invalidMinutes = !0))
                  : m(),
                n());
          }),
          (a.showSpinners = angular.isDefined(c.showSpinners)
            ? a.$parent.$eval(c.showSpinners)
            : g.showSpinners),
          (a.incrementHours = function() {
            a.noIncrementHours() || o(60 * A * 60);
          }),
          (a.decrementHours = function() {
            a.noDecrementHours() || o(60 * -A * 60);
          }),
          (a.incrementMinutes = function() {
            a.noIncrementMinutes() || o(60 * B);
          }),
          (a.decrementMinutes = function() {
            a.noDecrementMinutes() || o(60 * -B);
          }),
          (a.incrementSeconds = function() {
            a.noIncrementSeconds() || o(F);
          }),
          (a.decrementSeconds = function() {
            a.noDecrementSeconds() || o(-F);
          }),
          (a.toggleMeridian = function() {
            var b = i(),
              c = h();
            a.noToggleMeridian() ||
              (angular.isDefined(b) && angular.isDefined(c)
                ? o(720 * (v.getHours() < 12 ? 60 : -60))
                : (a.meridian = a.meridian === y[0] ? y[1] : y[0]));
          }),
          (a.blur = function() {
            x.$setTouched();
          }),
          a.$on("$destroy", function() {
            for (; w.length; ) w.shift()();
          });
      }
    ])
    .directive("uibTimepicker", [
      "uibTimepickerConfig",
      function(a) {
        return {
          require: ["uibTimepicker", "?^ngModel"],
          restrict: "A",
          controller: "UibTimepickerController",
          controllerAs: "timepicker",
          scope: {},
          templateUrl: function(b, c) {
            return c.templateUrl || a.templateUrl;
          },
          link: function(a, b, c, d) {
            var e = d[0],
              f = d[1];
            f && e.init(f, b.find("input"));
          }
        };
      }
    ]),
  angular
    .module("ui.bootstrap.typeahead", [
      "ui.bootstrap.debounce",
      "ui.bootstrap.position"
    ])
    .factory("uibTypeaheadParser", [
      "$parse",
      function(a) {
        var b = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;
        return {
          parse: function(c) {
            var d = c.match(b);
            if (!d)
              throw new Error(
                'Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_" but got "' +
                  c +
                  '".'
              );
            return {
              itemName: d[3],
              source: a(d[4]),
              viewMapper: a(d[2] || d[1]),
              modelMapper: a(d[1])
            };
          }
        };
      }
    ])
    .controller("UibTypeaheadController", [
      "$scope",
      "$element",
      "$attrs",
      "$compile",
      "$parse",
      "$q",
      "$timeout",
      "$document",
      "$window",
      "$rootScope",
      "$$debounce",
      "$uibPosition",
      "uibTypeaheadParser",
      function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
        function n() {
          P.moveInProgress || ((P.moveInProgress = !0), P.$digest()), $();
        }
        function o() {
          (P.position = F ? l.offset(b) : l.position(b)),
            (P.position.top += b.prop("offsetHeight"));
        }
        function p(a) {
          var b;
          return (
            angular.version.minor < 6
              ? ((b = a.$options || {}),
                (b.getOption = function(a) {
                  return b[a];
                }))
              : (b = a.$options),
            b
          );
        }
        var q,
          r,
          s = [9, 13, 27, 38, 40],
          t = 200,
          u = a.$eval(c.typeaheadMinLength);
        u || 0 === u || (u = 1),
          a.$watch(c.typeaheadMinLength, function(a) {
            u = a || 0 === a ? a : 1;
          });
        var v = a.$eval(c.typeaheadWaitMs) || 0,
          w = a.$eval(c.typeaheadEditable) !== !1;
        a.$watch(c.typeaheadEditable, function(a) {
          w = a !== !1;
        });
        var x,
          y,
          z = e(c.typeaheadLoading).assign || angular.noop,
          A = c.typeaheadShouldSelect
            ? e(c.typeaheadShouldSelect)
            : function(a, b) {
                var c = b.$event;
                return 13 === c.which || 9 === c.which;
              },
          B = e(c.typeaheadOnSelect),
          C =
            !!angular.isDefined(c.typeaheadSelectOnBlur) &&
            a.$eval(c.typeaheadSelectOnBlur),
          D = e(c.typeaheadNoResults).assign || angular.noop,
          E = c.typeaheadInputFormatter ? e(c.typeaheadInputFormatter) : void 0,
          F = !!c.typeaheadAppendToBody && a.$eval(c.typeaheadAppendToBody),
          G = c.typeaheadAppendTo ? a.$eval(c.typeaheadAppendTo) : null,
          H = a.$eval(c.typeaheadFocusFirst) !== !1,
          I = !!c.typeaheadSelectOnExact && a.$eval(c.typeaheadSelectOnExact),
          J = e(c.typeaheadIsOpen).assign || angular.noop,
          K = a.$eval(c.typeaheadShowHint) || !1,
          L = e(c.ngModel),
          M = e(c.ngModel + "($$$p)"),
          N = function(b, c) {
            return angular.isFunction(L(a)) && r.getOption("getterSetter")
              ? M(b, { $$$p: c })
              : L.assign(b, c);
          },
          O = m.parse(c.uibTypeahead),
          P = a.$new(),
          Q = a.$on("$destroy", function() {
            P.$destroy();
          });
        P.$on("$destroy", Q);
        var R = "typeahead-" + P.$id + "-" + Math.floor(1e4 * Math.random());
        b.attr({
          "aria-autocomplete": "list",
          "aria-expanded": !1,
          "aria-owns": R
        });
        var S, T;
        K &&
          ((S = angular.element("<div></div>")),
          S.css("position", "relative"),
          b.after(S),
          (T = b.clone()),
          T.attr("placeholder", ""),
          T.attr("tabindex", "-1"),
          T.val(""),
          T.css({
            position: "absolute",
            top: "0px",
            left: "0px",
            "border-color": "transparent",
            "box-shadow": "none",
            opacity: 1,
            background:
              "none 0% 0% / auto repeat scroll padding-box border-box rgb(255, 255, 255)",
            color: "#999"
          }),
          b.css({
            position: "relative",
            "vertical-align": "top",
            "background-color": "transparent"
          }),
          T.attr("id") && T.removeAttr("id"),
          S.append(T),
          T.after(b));
        var U = angular.element("<div uib-typeahead-popup></div>");
        U.attr({
          id: R,
          matches: "matches",
          active: "activeIdx",
          select: "select(activeIdx, evt)",
          "move-in-progress": "moveInProgress",
          query: "query",
          position: "position",
          "assign-is-open": "assignIsOpen(isOpen)",
          debounce: "debounceUpdate"
        }),
          angular.isDefined(c.typeaheadTemplateUrl) &&
            U.attr("template-url", c.typeaheadTemplateUrl),
          angular.isDefined(c.typeaheadPopupTemplateUrl) &&
            U.attr("popup-template-url", c.typeaheadPopupTemplateUrl);
        var V = function() {
            K && T.val("");
          },
          W = function() {
            (P.matches = []),
              (P.activeIdx = -1),
              b.attr("aria-expanded", !1),
              V();
          },
          X = function(a) {
            return R + "-option-" + a;
          };
        P.$watch("activeIdx", function(a) {
          a < 0
            ? b.removeAttr("aria-activedescendant")
            : b.attr("aria-activedescendant", X(a));
        });
        var Y = function(a, b) {
            return (
              !!(P.matches.length > b && a) &&
              a.toUpperCase() === P.matches[b].label.toUpperCase()
            );
          },
          Z = function(c, d) {
            var e = { $viewValue: c };
            z(a, !0),
              D(a, !1),
              f.when(O.source(a, e)).then(
                function(f) {
                  var g = c === q.$viewValue;
                  if (g && x)
                    if (f && f.length > 0) {
                      (P.activeIdx = H ? 0 : -1),
                        D(a, !1),
                        (P.matches.length = 0);
                      for (var h = 0; h < f.length; h++)
                        (e[O.itemName] = f[h]),
                          P.matches.push({
                            id: X(h),
                            label: O.viewMapper(P, e),
                            model: f[h]
                          });
                      if (
                        ((P.query = c),
                        o(),
                        b.attr("aria-expanded", !0),
                        I &&
                          1 === P.matches.length &&
                          Y(c, 0) &&
                          (angular.isNumber(P.debounceUpdate) ||
                          angular.isObject(P.debounceUpdate)
                            ? k(function() {
                                P.select(0, d);
                              }, angular.isNumber(P.debounceUpdate)
                                ? P.debounceUpdate
                                : P.debounceUpdate["default"])
                            : P.select(0, d)),
                        K)
                      ) {
                        var i = P.matches[0].label;
                        angular.isString(c) &&
                        c.length > 0 &&
                        i.slice(0, c.length).toUpperCase() === c.toUpperCase()
                          ? T.val(c + i.slice(c.length))
                          : T.val("");
                      }
                    } else W(), D(a, !0);
                  g && z(a, !1);
                },
                function() {
                  W(), z(a, !1), D(a, !0);
                }
              );
          };
        F &&
          (angular.element(i).on("resize", n), h.find("body").on("scroll", n));
        var $ = k(function() {
          P.matches.length && o(), (P.moveInProgress = !1);
        }, t);
        (P.moveInProgress = !1), (P.query = void 0);
        var _,
          aa = function(a) {
            _ = g(function() {
              Z(a);
            }, v);
          },
          ba = function() {
            _ && g.cancel(_);
          };
        W(),
          (P.assignIsOpen = function(b) {
            J(a, b);
          }),
          (P.select = function(d, e) {
            var f,
              h,
              i = {};
            (y = !0),
              (i[O.itemName] = h = P.matches[d].model),
              (f = O.modelMapper(a, i)),
              N(a, f),
              q.$setValidity("editable", !0),
              q.$setValidity("parse", !0),
              B(a, {
                $item: h,
                $model: f,
                $label: O.viewMapper(a, i),
                $event: e
              }),
              W(),
              P.$eval(c.typeaheadFocusOnSelect) !== !1 &&
                g(
                  function() {
                    b[0].focus();
                  },
                  0,
                  !1
                );
          }),
          b.on("keydown", function(b) {
            if (0 !== P.matches.length && s.indexOf(b.which) !== -1) {
              var c = A(a, { $event: b });
              if ((P.activeIdx === -1 && c) || (9 === b.which && b.shiftKey))
                return W(), void P.$digest();
              b.preventDefault();
              var d;
              switch (b.which) {
                case 27:
                  b.stopPropagation(), W(), a.$digest();
                  break;
                case 38:
                  (P.activeIdx =
                    (P.activeIdx > 0 ? P.activeIdx : P.matches.length) - 1),
                    P.$digest(),
                    (d = U[0].querySelectorAll(".uib-typeahead-match")[
                      P.activeIdx
                    ]),
                    (d.parentNode.scrollTop = d.offsetTop);
                  break;
                case 40:
                  (P.activeIdx = (P.activeIdx + 1) % P.matches.length),
                    P.$digest(),
                    (d = U[0].querySelectorAll(".uib-typeahead-match")[
                      P.activeIdx
                    ]),
                    (d.parentNode.scrollTop = d.offsetTop);
                  break;
                default:
                  c &&
                    P.$apply(function() {
                      angular.isNumber(P.debounceUpdate) ||
                      angular.isObject(P.debounceUpdate)
                        ? k(function() {
                            P.select(P.activeIdx, b);
                          }, angular.isNumber(P.debounceUpdate)
                            ? P.debounceUpdate
                            : P.debounceUpdate["default"])
                        : P.select(P.activeIdx, b);
                    });
              }
            }
          }),
          b.on("focus", function(a) {
            (x = !0),
              0 !== u ||
                q.$viewValue ||
                g(function() {
                  Z(q.$viewValue, a);
                }, 0);
          }),
          b.on("blur", function(a) {
            C &&
              P.matches.length &&
              P.activeIdx !== -1 &&
              !y &&
              ((y = !0),
              P.$apply(function() {
                angular.isObject(P.debounceUpdate) &&
                angular.isNumber(P.debounceUpdate.blur)
                  ? k(function() {
                      P.select(P.activeIdx, a);
                    }, P.debounceUpdate.blur)
                  : P.select(P.activeIdx, a);
              })),
              !w &&
                q.$error.editable &&
                (q.$setViewValue(),
                P.$apply(function() {
                  q.$setValidity("editable", !0), q.$setValidity("parse", !0);
                }),
                b.val("")),
              (x = !1),
              (y = !1);
          });
        var ca = function(c) {
          b[0] !== c.target &&
            3 !== c.which &&
            0 !== P.matches.length &&
            (W(), j.$$phase || a.$digest());
        };
        h.on("click", ca),
          a.$on("$destroy", function() {
            h.off("click", ca),
              (F || G) && da.remove(),
              F &&
                (angular.element(i).off("resize", n),
                h.find("body").off("scroll", n)),
              U.remove(),
              K && S.remove();
          });
        var da = d(U)(P);
        F
          ? h.find("body").append(da)
          : G
            ? angular
                .element(G)
                .eq(0)
                .append(da)
            : b.after(da),
          (this.init = function(b) {
            (q = b),
              (r = p(q)),
              (P.debounceUpdate = e(r.getOption("debounce"))(a)),
              q.$parsers.unshift(function(b) {
                return (
                  (x = !0),
                  0 === u || (b && b.length >= u)
                    ? v > 0
                      ? (ba(), aa(b))
                      : Z(b)
                    : (z(a, !1), ba(), W()),
                  w
                    ? b
                    : b
                      ? void q.$setValidity("editable", !1)
                      : (q.$setValidity("editable", !0), null)
                );
              }),
              q.$formatters.push(function(b) {
                var c,
                  d,
                  e = {};
                return (
                  w || q.$setValidity("editable", !0),
                  E
                    ? ((e.$model = b), E(a, e))
                    : ((e[O.itemName] = b),
                      (c = O.viewMapper(a, e)),
                      (e[O.itemName] = void 0),
                      (d = O.viewMapper(a, e)),
                      c !== d ? c : b)
                );
              });
          });
      }
    ])
    .directive("uibTypeahead", function() {
      return {
        controller: "UibTypeaheadController",
        require: ["ngModel", "uibTypeahead"],
        link: function(a, b, c, d) {
          d[1].init(d[0]);
        }
      };
    })
    .directive("uibTypeaheadPopup", [
      "$$debounce",
      function(a) {
        return {
          scope: {
            matches: "=",
            query: "=",
            active: "=",
            position: "&",
            moveInProgress: "=",
            select: "&",
            assignIsOpen: "&",
            debounce: "&"
          },
          replace: !0,
          templateUrl: function(a, b) {
            return (
              b.popupTemplateUrl ||
              "uib/template/typeahead/typeahead-popup.html"
            );
          },
          link: function(b, c, d) {
            (b.templateUrl = d.templateUrl),
              (b.isOpen = function() {
                var a = b.matches.length > 0;
                return b.assignIsOpen({ isOpen: a }), a;
              }),
              (b.isActive = function(a) {
                return b.active === a;
              }),
              (b.selectActive = function(a) {
                b.active = a;
              }),
              (b.selectMatch = function(c, d) {
                var e = b.debounce();
                angular.isNumber(e) || angular.isObject(e)
                  ? a(function() {
                      b.select({ activeIdx: c, evt: d });
                    }, angular.isNumber(e) ? e : e["default"])
                  : b.select({ activeIdx: c, evt: d });
              });
          }
        };
      }
    ])
    .directive("uibTypeaheadMatch", [
      "$templateRequest",
      "$compile",
      "$parse",
      function(a, b, c) {
        return {
          scope: { index: "=", match: "=", query: "=" },
          link: function(d, e, f) {
            var g =
              c(f.templateUrl)(d.$parent) ||
              "uib/template/typeahead/typeahead-match.html";
            a(g).then(function(a) {
              var c = angular.element(a.trim());
              e.replaceWith(c), b(c)(d);
            });
          }
        };
      }
    ])
    .filter("uibTypeaheadHighlight", [
      "$sce",
      "$injector",
      "$log",
      function(a, b, c) {
        function d(a) {
          return a.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
        }
        function e(a) {
          return /<.*>/g.test(a);
        }
        var f;
        return (
          (f = b.has("$sanitize")),
          function(b, g) {
            return (
              !f &&
                e(b) &&
                c.warn("Unsafe use of typeahead please use ngSanitize"),
              (b = g
                ? ("" + b).replace(
                    new RegExp(d(g), "gi"),
                    "<strong>$&</strong>"
                  )
                : b),
              f || (b = a.trustAsHtml(b)),
              b
            );
          }
        );
      }
    ]),
  angular.module("uib/template/accordion/accordion-group.html", []).run([
    "$templateCache",
    function(a) {
      a.put(
        "uib/template/accordion/accordion-group.html",
        '<div role="tab" id="{{::headingId}}" aria-selected="{{isOpen}}" class="card-header" ng-keypress="toggleOpen($event)">\n  <h5 class="mb-0">\n    <a role="button" data-toggle="collapse" href aria-expanded="{{isOpen}}" aria-controls="{{::cardId}}" tabindex="0" class="accordion-toggle"  ng-click="toggleOpen()" uib-accordion-transclude="heading" ng-disabled="isDisabled" uib-tabindex-toggle><span uib-accordion-header ng-class="{\'text-muted\': isDisabled}">{{heading}}</span></a>\n  </h5>\n</div>\n<div id="{{::cardId}}" aria-labelledby="{{::headingId}}" aria-hidden="{{!isOpen}}" role="tabcard" class="card-collapse collapse" uib-collapse="!isOpen">\n  <div class="card-body" ng-transclude></div>\n</div>\n'
      );
    }
  ]),
  angular.module("uib/template/accordion/accordion.html", []).run([
    "$templateCache",
    function(a) {
      a.put(
        "uib/template/accordion/accordion.html",
        '<div role="tablist" ng-transclude></div>\n'
      );
    }
  ]),
  angular.module("uib/template/alert/alert.html", []).run([
    "$templateCache",
    function(a) {
      a.put(
        "uib/template/alert/alert.html",
        '<button ng-show="closeable" type="button" class="close" ng-click="close({$event: $event})">\n  <span aria-hidden="true">&times;</span>\n  <span class="sr-only">Close</span>\n</button>\n<div ng-transclude></div>\n'
      );
    }
  ]),
  angular.module("uib/template/carousel/carousel.html", []).run([
    "$templateCache",
    function(a) {
      a.put(
        "uib/template/carousel/carousel.html",
        '<div class="carousel-inner" ng-transclude></div>\n<a role="button" href class="carousel-control-prev" ng-click="prev()" ng-class="{ disabled: isPrevDisabled() }" ng-show="slides.length > 1">\n    <span class="carousel-control-prev-icon" aria-hidden="true"></span>\n    <span class="sr-only">Previous</span>\n</a>\n<a role="button" href class="carousel-control-next" ng-click="next()" ng-class="{ disabled: isNextDisabled() }" ng-show="slides.length > 1">\n    <span class="carousel-control-next-icon" aria-hidden="true"></span>\n    <span class="sr-only">Next</span>\n</a>\n<ol class="carousel-indicators" ng-show="slides.length > 1">\n  <li ng-repeat="slide in slides | orderBy:indexOfSlide track by $index" ng-class="{ active: isActive(slide) }" ng-click="select(slide)">\n    <span class="sr-only">slide {{ $index + 1 }} of {{ slides.length }}<span ng-if="isActive(slide)">, currently active</span></span>\n  </li>\n</ol>\n'
      );
    }
  ]),
  angular.module("uib/template/carousel/slide.html", []).run([
    "$templateCache",
    function(a) {
      a.put(
        "uib/template/carousel/slide.html",
        '<div class="text-center" ng-transclude></div>\n'
      );
    }
  ]),
  angular.module("uib/template/datepicker/datepicker.html", []).run([
    "$templateCache",
    function(a) {
      a.put(
        "uib/template/datepicker/datepicker.html",
        '<div ng-switch="datepickerMode">\n  <div uib-daypicker ng-switch-when="day" tabindex="0" class="uib-daypicker"></div>\n  <div uib-monthpicker ng-switch-when="month" tabindex="0" class="uib-monthpicker"></div>\n  <div uib-yearpicker ng-switch-when="year" tabindex="0" class="uib-yearpicker"></div>\n</div>\n'
      );
    }
  ]),
  angular.module("uib/template/datepicker/day.html", []).run([
    "$templateCache",
    function(a) {
      a.put(
        "uib/template/datepicker/day.html",
        '<table role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th>\n        <button type="button" class="btn btn-secondary btn-sm float-left uib-left" ng-click="move(-1)" tabindex="-1">\n          <i aria-hidden="true" class="fa-svg-icon">\n            <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"/></svg>\n          </i>\n          <span class="sr-only">previous</span>\n        </button>\n      </th>\n      <th colspan="{{::5 + showWeeks}}"><button id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-secondary btn-sm uib-title" ng-click="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="-1"><strong>{{title}}</strong></button></th>\n      <th>\n        <button type="button" class="btn btn-secondary btn-sm float-right uib-right" ng-click="move(1)" tabindex="-1">\n          <i aria-hidden="true" class="fa-svg-icon">\n            <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"/></svg>\n          </i>\n          <span class="sr-only">next</span>\n        </button>\n      </th>\n    </tr>\n    <tr>\n      <th ng-if="showWeeks" class="text-center"></th>\n      <th ng-repeat="label in ::labels track by $index" class="text-center"><small aria-label="{{::label.full}}">{{::label.abbr}}</small></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr class="uib-weeks" ng-repeat="row in rows track by $index" role="row">\n      <td ng-if="showWeeks" class="text-center h6"><em>{{ weekNumbers[$index] }}</em></td>\n      <td ng-repeat="dt in row" class="uib-day text-center" role="gridcell"\n        id="{{::dt.uid}}"\n        ng-class="::dt.customClass">\n        <button type="button" class="btn btn-secondary btn-sm"\n          uib-is-class="\n            \'btn-info\' for selectedDt,\n            \'active\' for activeDt\n            on dt"\n          ng-click="select(dt.date)"\n          ng-disabled="::dt.disabled"\n          tabindex="-1"><span ng-class="::{\'text-muted\': dt.secondary, \'text-info\': dt.current}">{{::dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n'
      );
    }
  ]),
  angular.module("uib/template/datepicker/month.html", []).run([
    "$templateCache",
    function(a) {
      a.put(
        "uib/template/datepicker/month.html",
        '<table role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th>\n        <button type="button" class="btn btn-secondary btn-sm float-left uib-left" ng-click="move(-1)" tabindex="-1">\n          <i aria-hidden="true" class="fa-svg-icon">\n            <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"/></svg>\n          </i>\n          <span class="sr-only">previous</span>\n        </button>\n      </th>\n      <th colspan="{{::yearHeaderColspan}}"><button id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-secondary btn-sm uib-title" ng-click="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="-1"><strong>{{title}}</strong></button></th>\n      <th>\n        <button type="button" class="btn btn-secondary btn-sm float-right uib-right" ng-click="move(1)" tabindex="-1">\n          <i aria-hidden="true" class="fa-svg-icon">\n            <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"/></svg>\n          </i>\n          <span class="sr-only">next</span>\n        </button>\n      </th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr class="uib-months" ng-repeat="row in rows track by $index" role="row">\n      <td ng-repeat="dt in row" class="uib-month text-center" role="gridcell"\n        id="{{::dt.uid}}"\n        ng-class="::dt.customClass">\n        <button type="button" class="btn btn-secondary"\n          uib-is-class="\n            \'btn-info\' for selectedDt,\n            \'active\' for activeDt\n            on dt"\n          ng-click="select(dt.date)"\n          ng-disabled="::dt.disabled"\n          tabindex="-1"><span ng-class="::{\'text-info\': dt.current}">{{::dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n'
      );
    }
  ]),
  angular.module("uib/template/datepicker/year.html", []).run([
    "$templateCache",
    function(a) {
      a.put(
        "uib/template/datepicker/year.html",
        '<table role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n  <tr>\n    <th>\n      <button type="button" class="btn btn-secondary btn-sm float-left uib-left" ng-click="move(-1)" tabindex="-1">\n        <i aria-hidden="true" class="fa-svg-icon">\n          <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"/></svg>\n        </i>\n        <span class="sr-only">previous</span>\n      </button>\n    </th>\n    <th colspan="{{::columns - 2}}">\n      <button id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button"\n              class="btn btn-secondary btn-sm uib-title" ng-click="toggleMode()"\n              ng-disabled="datepickerMode === maxMode" tabindex="-1">\n        <strong>{{title}}</strong>\n      </button>\n    </th>\n    <th>\n      <button type="button" class="btn btn-secondary btn-sm float-right uib-right" ng-click="move(1)" tabindex="-1">\n        <i aria-hidden="true" class="fa-svg-icon">\n          <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"/></svg>\n        </i>\n        <span class="sr-only">next</span>\n      </button>\n    </th>\n  </tr>\n  </thead>\n  <tbody>\n  <tr class="uib-years" ng-repeat="row in rows track by $index" role="row">\n    <td ng-repeat="dt in row" class="uib-year text-center" role="gridcell"\n        id="{{::dt.uid}}"\n        ng-class="::dt.customClass">\n      <button type="button" class="btn btn-secondary"\n              uib-is-class="\n            \'btn-info\' for selectedDt,\n            \'active\' for activeDt\n            on dt"\n              ng-click="select(dt.date)"\n              ng-disabled="::dt.disabled"\n              tabindex="-1"><span ng-class="::{\'text-info\': dt.current}">{{::dt.label}}</span></button>\n    </td>\n  </tr>\n  </tbody>\n</table>\n'
      );
    }
  ]),
  angular.module("uib/template/datepickerPopup/popup.html", []).run([
    "$templateCache",
    function(a) {
      a.put(
        "uib/template/datepickerPopup/popup.html",
        '<ul role="presentation" class="uib-datepicker-popup dropdown-menu uib-position-measure" dropdown-nested ng-if="isOpen" ng-keydown="keydown($event)" ng-click="$event.stopPropagation()">\n  <li ng-transclude></li>\n  <li ng-if="showButtonBar" class="uib-button-bar">\n    <span class="btn-group float-left">\n      <button type="button" class="btn btn-sm btn-info uib-datepicker-current" ng-click="select(\'today\', $event)" ng-disabled="isDisabled(\'today\')">{{ getText(\'current\') }}</button>\n      <button type="button" class="btn btn-sm btn-danger uib-clear" ng-click="select(null, $event)">{{ getText(\'clear\') }}</button>\n    </span>\n    <button type="button" class="btn btn-sm btn-success float-right uib-close" ng-click="close($event)">{{ getText(\'close\') }}</button>\n  </li>\n</ul>\n'
      );
    }
  ]),
  angular.module("uib/template/modal/window.html", []).run([
    "$templateCache",
    function(a) {
      a.put(
        "uib/template/modal/window.html",
        "<div class=\"modal-dialog {{size ? 'modal-' + size : ''}}\"><div class=\"modal-content\" uib-modal-transclude></div></div>\n"
      );
    }
  ]),
  angular.module("uib/template/pager/pager.html", []).run([
    "$templateCache",
    function(a) {
      a.put(
        "uib/template/pager/pager.html",
        '<li ng-class="{disabled: noPrevious()||ngDisabled, previous: align}"><a href ng-click="selectPage(page - 1, $event)" ng-disabled="noPrevious()||ngDisabled" uib-tabindex-toggle>{{::getText(\'previous\')}}</a></li>\n<li ng-class="{disabled: noNext()||ngDisabled, next: align}"><a href ng-click="selectPage(page + 1, $event)" ng-disabled="noNext()||ngDisabled" uib-tabindex-toggle>{{::getText(\'next\')}}</a></li>\n'
      );
    }
  ]),
  angular.module("uib/template/pagination/pagination.html", []).run([
    "$templateCache",
    function(a) {
      a.put(
        "uib/template/pagination/pagination.html",
        '<li role="menuitem" ng-if="::boundaryLinks" ng-class="{disabled: noPrevious()||ngDisabled}" class="page-item"><a href ng-click="selectPage(1, $event)" ng-disabled="noPrevious()||ngDisabled" uib-tabindex-toggle class="page-link">{{::getText(\'first\')}}</a></li>\n<li role="menuitem" ng-if="::directionLinks" ng-class="{disabled: noPrevious()||ngDisabled}" class="page-item"><a href ng-click="selectPage(page - 1, $event)" ng-disabled="noPrevious()||ngDisabled" uib-tabindex-toggle class="page-link">{{::getText(\'previous\')}}</a></li>\n<li role="menuitem" ng-repeat="page in pages track by $index" ng-class="{active: page.active,disabled: ngDisabled&&!page.active}" class="page-item"><a href ng-click="selectPage(page.number, $event)" ng-disabled="ngDisabled&&!page.active" uib-tabindex-toggle class="page-link">{{page.text}}</a></li>\n<li role="menuitem" ng-if="::directionLinks" ng-class="{disabled: noNext()||ngDisabled}" class="page-item"><a href ng-click="selectPage(page + 1, $event)" ng-disabled="noNext()||ngDisabled" uib-tabindex-toggle class="page-link">{{::getText(\'next\')}}</a></li>\n<li role="menuitem" ng-if="::boundaryLinks" ng-class="{disabled: noNext()||ngDisabled}" class="page-item"><a href ng-click="selectPage(totalPages, $event)" ng-disabled="noNext()||ngDisabled" uib-tabindex-toggle class="page-link">{{::getText(\'last\')}}</a></li>\n'
      );
    }
  ]),
  angular.module("uib/template/tooltip/tooltip-html-popup.html", []).run([
    "$templateCache",
    function(a) {
      a.put(
        "uib/template/tooltip/tooltip-html-popup.html",
        '<div class="arrow"></div>\n<div class="tooltip-inner" ng-bind-html="contentExp()"></div>\n'
      );
    }
  ]),
  angular.module("uib/template/tooltip/tooltip-popup.html", []).run([
    "$templateCache",
    function(a) {
      a.put(
        "uib/template/tooltip/tooltip-popup.html",
        '<div class="arrow"></div>\n<div class="tooltip-inner" ng-bind="content"></div>\n'
      );
    }
  ]),
  angular.module("uib/template/tooltip/tooltip-template-popup.html", []).run([
    "$templateCache",
    function(a) {
      a.put(
        "uib/template/tooltip/tooltip-template-popup.html",
        '<div class="arrow"></div>\n<div class="tooltip-inner"\n  uib-tooltip-template-transclude="contentExp()"\n  tooltip-template-transclude-scope="originScope()"></div>\n'
      );
    }
  ]),
  angular.module("uib/template/popover/popover-html.html", []).run([
    "$templateCache",
    function(a) {
      a.put(
        "uib/template/popover/popover-html.html",
        '<div class="arrow"></div>\n<h3 class="popover-header" ng-bind="uibTitle" ng-if="uibTitle"></h3>\n<div class="popover-body" ng-bind-html="contentExp()"></div>\n'
      );
    }
  ]),
  angular.module("uib/template/popover/popover-template.html", []).run([
    "$templateCache",
    function(a) {
      a.put(
        "uib/template/popover/popover-template.html",
        '<div class="arrow"></div>\n\n<h3 class="popover-header" ng-bind="uibTitle" ng-if="uibTitle"></h3>\n<div class="popover-body"\n  uib-tooltip-template-transclude="contentExp()"\n  tooltip-template-transclude-scope="originScope()"></div>\n'
      );
    }
  ]),
  angular.module("uib/template/popover/popover.html", []).run([
    "$templateCache",
    function(a) {
      a.put(
        "uib/template/popover/popover.html",
        '<div class="arrow"></div>\n<h3 class="popover-header" ng-bind="uibTitle" ng-if="uibTitle"></h3>\n<div class="popover-body" ng-bind="content"></div>\n'
      );
    }
  ]),
  angular.module("uib/template/progressbar/bar.html", []).run([
    "$templateCache",
    function(a) {
      a.put(
        "uib/template/progressbar/bar.html",
        '<div class="progress-bar" ng-class="[type ? \'bg-\' + type : \'\', striped ? \'progress-bar-striped\' : \'\']" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: (percent < 100 ? percent : 100) + \'%\'}" aria-valuetext="{{percent | number:0}}%" aria-labelledby="{{::title}}" ng-transclude></div>\n'
      );
    }
  ]),
  angular.module("uib/template/progressbar/progress.html", []).run([
    "$templateCache",
    function(a) {
      a.put(
        "uib/template/progressbar/progress.html",
        '<div class="progress" ng-transclude aria-labelledby="{{::title}}"></div>'
      );
    }
  ]),
  angular.module("uib/template/progressbar/progressbar.html", []).run([
    "$templateCache",
    function(a) {
      a.put(
        "uib/template/progressbar/progressbar.html",
        '<div class="progress">\n  <div class="progress-bar" ng-class="[type ? \'bg-\' + type : \'\', striped ? \'progress-bar-striped\' : \'\']" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: (percent < 100 ? percent : 100) + \'%\'}" aria-valuetext="{{percent | number:0}}%" aria-labelledby="{{::title}}" ng-transclude></div>\n</div>\n'
      );
    }
  ]),
  angular.module("uib/template/rating/rating.html", []).run([
    "$templateCache",
    function(a) {
      a.put(
        "uib/template/rating/rating.html",
        '<span ng-mouseleave="reset()" ng-keydown="onKeydown($event)" tabindex="0" role="slider" aria-valuemin="0" aria-valuemax="{{range.length}}" aria-valuenow="{{value}}" aria-valuetext="{{title}}">\n    <span ng-repeat-start="r in range track by $index" class="sr-only">({{ $index < value ? \'*\' : \' \' }})</span>\n    <i ng-repeat-end ng-mouseenter="enter($index + 1)" ng-click="rate($index + 1)" class="fa-svg-icon" ng-class="$index < value && (r.stateOn || \'star\') || (r.stateOff || \'star-empty\')" ng-attr-title="{{r.title}}">\n        <svg data-ng-if="$index < value" width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"/></svg>\n        <svg data-ng-if="$index >= value" width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1201 1004l306-297-422-62-189-382-189 382-422 62 306 297-73 421 378-199 377 199zm527-357q0 22-26 48l-363 354 86 500q1 7 1 20 0 50-41 50-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"/></svg>\n    </i>\n</span>\n'
      );
    }
  ]),
  angular.module("uib/template/tabs/tab.html", []).run([
    "$templateCache",
    function(a) {
      a.put(
        "uib/template/tabs/tab.html",
        '<li class="uib-tab nav-item">\n  <a href ng-click="select($event)" ng-class="[{active: active, disabled: disabled}, classes]" class="nav-link" uib-tab-heading-transclude>{{heading}}</a>\n</li>\n'
      );
    }
  ]),
  angular.module("uib/template/tabs/tabset.html", []).run([
    "$templateCache",
    function(a) {
      a.put(
        "uib/template/tabs/tabset.html",
        '<div>\n  <ul class="nav nav-{{tabset.type || \'tabs\'}}" ng-class="{\'nav-stacked\': vertical, \'nav-justified\': justified}" ng-transclude></ul>\n  <div class="tab-content">\n    <div class="tab-pane"\n         ng-repeat="tab in tabset.tabs"\n         ng-class="{active: tabset.active === tab.index}"\n         uib-tab-content-transclude="tab">\n    </div>\n  </div>\n</div>\n'
      );
    }
  ]),
  angular.module("uib/template/timepicker/timepicker.html", []).run([
    "$templateCache",
    function(a) {
      a.put(
        "uib/template/timepicker/timepicker.html",
        '<table class="uib-timepicker">\n  <tbody>\n    <tr class="text-center" ng-show="::showSpinners">\n      <td class="uib-increment hours">\n        <a ng-click="incrementHours()" ng-class="{disabled: noIncrementHours()}" class="btn btn-link" ng-disabled="noIncrementHours()" tabindex="-1">\n          <span class="fa-svg-icon">\n            <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1683 1331l-166 165q-19 19-45 19t-45-19l-531-531-531 531q-19 19-45 19t-45-19l-166-165q-19-19-19-45.5t19-45.5l742-741q19-19 45-19t45 19l742 741q19 19 19 45.5t-19 45.5z"/></svg>\n          </span>\n        </a>\n      </td>\n      <td>&nbsp;</td>\n      <td class="uib-increment minutes">\n        <a ng-click="incrementMinutes()" ng-class="{disabled: noIncrementMinutes()}" class="btn btn-link" ng-disabled="noIncrementMinutes()" tabindex="-1">\n          <span class="fa-svg-icon">\n            <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1683 1331l-166 165q-19 19-45 19t-45-19l-531-531-531 531q-19 19-45 19t-45-19l-166-165q-19-19-19-45.5t19-45.5l742-741q19-19 45-19t45 19l742 741q19 19 19 45.5t-19 45.5z"/></svg>\n          </span>\n        </a>\n      </td>\n      <td ng-show="showSeconds">&nbsp;</td>\n      <td ng-show="showSeconds" class="uib-increment seconds">\n        <a ng-click="incrementSeconds()" ng-class="{disabled: noIncrementSeconds()}" class="btn btn-link" ng-disabled="noIncrementSeconds()" tabindex="-1">\n          <span class="fa-svg-icon">\n            <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1683 1331l-166 165q-19 19-45 19t-45-19l-531-531-531 531q-19 19-45 19t-45-19l-166-165q-19-19-19-45.5t19-45.5l742-741q19-19 45-19t45 19l742 741q19 19 19 45.5t-19 45.5z"/></svg>\n          </span>\n        </a>\n      </td>\n      <td ng-show="showMeridian"></td>\n    </tr>\n    <tr>\n      <td class="form-group uib-time hours" ng-class="{\'has-error\': invalidHours}">\n        <input type="text" placeholder="HH" ng-model="hours" ng-change="updateHours()" class="form-control text-center" ng-readonly="::readonlyInput" maxlength="2" tabindex="{{::tabindex}}" ng-disabled="noIncrementHours()" ng-blur="blur()">\n      </td>\n      <td class="uib-separator">:</td>\n      <td class="form-group uib-time minutes" ng-class="{\'has-error\': invalidMinutes}">\n        <input type="text" placeholder="MM" ng-model="minutes" ng-change="updateMinutes()" class="form-control text-center" ng-readonly="::readonlyInput" maxlength="2" tabindex="{{::tabindex}}" ng-disabled="noIncrementMinutes()" ng-blur="blur()">\n      </td>\n      <td ng-show="showSeconds" class="uib-separator">:</td>\n      <td class="form-group uib-time seconds" ng-class="{\'has-error\': invalidSeconds}" ng-show="showSeconds">\n        <input type="text" placeholder="SS" ng-model="seconds" ng-change="updateSeconds()" class="form-control text-center" ng-readonly="readonlyInput" maxlength="2" tabindex="{{::tabindex}}" ng-disabled="noIncrementSeconds()" ng-blur="blur()">\n      </td>\n      <td ng-show="showMeridian" class="uib-time am-pm"><button type="button" ng-class="{disabled: noToggleMeridian()}" class="btn btn-secondary text-center" ng-click="toggleMeridian()" ng-disabled="noToggleMeridian()" tabindex="{{::tabindex}}">{{meridian}}</button></td>\n    </tr>\n    <tr class="text-center" ng-show="::showSpinners">\n      <td class="uib-decrement hours">\n        <a ng-click="decrementHours()" ng-class="{disabled: noDecrementHours()}" class="btn btn-link" ng-disabled="noDecrementHours()" tabindex="-1">\n          <span class="fa-svg-icon">\n            <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1683 808l-742 741q-19 19-45 19t-45-19l-742-741q-19-19-19-45.5t19-45.5l166-165q19-19 45-19t45 19l531 531 531-531q19-19 45-19t45 19l166 165q19 19 19 45.5t-19 45.5z"/></svg>\n          </span>\n        </a>\n      </td>\n      <td>&nbsp;</td>\n      <td class="uib-decrement minutes">\n        <a ng-click="decrementMinutes()" ng-class="{disabled: noDecrementMinutes()}" class="btn btn-link" ng-disabled="noDecrementMinutes()" tabindex="-1">\n          <span class="fa-svg-icon">\n            <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1683 808l-742 741q-19 19-45 19t-45-19l-742-741q-19-19-19-45.5t19-45.5l166-165q19-19 45-19t45 19l531 531 531-531q19-19 45-19t45 19l166 165q19 19 19 45.5t-19 45.5z"/></svg>\n          </span>\n        </a>\n      </td>\n      <td ng-show="showSeconds">&nbsp;</td>\n      <td ng-show="showSeconds" class="uib-decrement seconds">\n        <a ng-click="decrementSeconds()" ng-class="{disabled: noDecrementSeconds()}" class="btn btn-link" ng-disabled="noDecrementSeconds()" tabindex="-1">\n          <span class="fa-svg-icon">\n            <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1683 808l-742 741q-19 19-45 19t-45-19l-742-741q-19-19-19-45.5t19-45.5l166-165q19-19 45-19t45 19l531 531 531-531q19-19 45-19t45 19l166 165q19 19 19 45.5t-19 45.5z"/></svg>\n          </span>\n        </a>\n      </td>\n      <td ng-show="showMeridian"></td>\n    </tr>\n  </tbody>\n</table>\n'
      );
    }
  ]),
  angular.module("uib/template/typeahead/typeahead-match.html", []).run([
    "$templateCache",
    function(a) {
      a.put(
        "uib/template/typeahead/typeahead-match.html",
        '<a href\n   tabindex="-1"\n   class="dropdown-item"\n   ng-bind-html="match.label | uibTypeaheadHighlight:query"\n   ng-attr-title="{{match.label}}"></a>\n'
      );
    }
  ]),
  angular.module("uib/template/typeahead/typeahead-popup.html", []).run([
    "$templateCache",
    function(a) {
      a.put(
        "uib/template/typeahead/typeahead-popup.html",
        '<ul class="dropdown-menu" ng-show="isOpen() && !moveInProgress" ng-style="{top: position().top+\'px\', left: position().left+\'px\'}" role="listbox" aria-hidden="{{!isOpen()}}">\n    <li class="uib-typeahead-match" ng-repeat="match in matches track by $index" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)" ng-click="selectMatch($index, $event)" role="option" id="{{::match.id}}">\n        <div uib-typeahead-match index="$index" match="match" query="query" template-url="templateUrl"></div>\n    </li>\n</ul>\n'
      );
    }
  ]),
  angular.module("ui.bootstrap.carousel").run(function() {
    !angular.$$csp().noInlineStyle &&
      !angular.$$uibCarouselCss &&
      angular
        .element(document)
        .find("head")
        .prepend(
          '<style type="text/css">.ng-animate.item:not(.left):not(.right){-webkit-transition:0s ease-in-out left;transition:0s ease-in-out left}</style>'
        ),
      (angular.$$uibCarouselCss = !0);
  }),
  angular.module("ui.bootstrap.common").run(function() {
    !angular.$$csp().noInlineStyle &&
      !angular.$$uibCommonCss &&
      angular
        .element(document)
        .find("head")
        .prepend(
          '<style type="text/css">.fa-svg-icon{display:inline-block;vertical-align:middle;min-width:1em;min-height:1em;height:100%;position:relative;top:-1px;}.fa-svg-icon svg{position:absolute;top:0;left:0;width:100%;height:100%;}.fa-svg-icon svg g,.fa-svg-icon svg path{fill:currentColor;}</style>'
        ),
      (angular.$$uibCommonCss = !0);
  }),
  angular.module("ui.bootstrap.datepicker").run(function() {
    !angular.$$csp().noInlineStyle &&
      !angular.$$uibDatepickerCss &&
      angular
        .element(document)
        .find("head")
        .prepend(
          '<style type="text/css">.uib-datepicker .uib-title{width:100%;}.uib-day button,.uib-month button,.uib-year button{min-width:100%;}.uib-left,.uib-right{width:100%}</style>'
        ),
      (angular.$$uibDatepickerCss = !0);
  }),
  angular.module("ui.bootstrap.position").run(function() {
    !angular.$$csp().noInlineStyle &&
      !angular.$$uibPositionCss &&
      angular
        .element(document)
        .find("head")
        .prepend(
          '<style type="text/css">.uib-position-measure{display:block !important;visibility:hidden !important;position:absolute !important;top:-9999px !important;left:-9999px !important;}.uib-position-scrollbar-measure{position:absolute !important;top:-9999px !important;width:50px !important;height:50px !important;overflow:scroll !important;}.uib-position-body-scrollbar-measure{overflow:scroll !important;}</style>'
        ),
      (angular.$$uibPositionCss = !0);
  }),
  angular.module("ui.bootstrap.datepickerPopup").run(function() {
    !angular.$$csp().noInlineStyle &&
      !angular.$$uibDatepickerpopupCss &&
      angular
        .element(document)
        .find("head")
        .prepend(
          '<style type="text/css">.uib-datepicker-popup.dropdown-menu{display:block;float:none;margin:0;}.uib-button-bar{padding:10px;}</style>'
        ),
      (angular.$$uibDatepickerpopupCss = !0);
  }),
  angular.module("ui.bootstrap.tooltip").run(function() {
    !angular.$$csp().noInlineStyle &&
      !angular.$$uibTooltipCss &&
      angular
        .element(document)
        .find("head")
        .prepend(
          '<style type="text/css">[uib-tooltip-popup].tooltip.top-left > .tooltip-arrow,[uib-tooltip-popup].tooltip.top-right > .tooltip-arrow,[uib-tooltip-popup].tooltip.bottom-left > .tooltip-arrow,[uib-tooltip-popup].tooltip.bottom-right > .tooltip-arrow,[uib-tooltip-popup].tooltip.left-top > .tooltip-arrow,[uib-tooltip-popup].tooltip.left-bottom > .tooltip-arrow,[uib-tooltip-popup].tooltip.right-top > .tooltip-arrow,[uib-tooltip-popup].tooltip.right-bottom > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.top-left > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.top-right > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.bottom-left > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.bottom-right > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.left-top > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.left-bottom > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.right-top > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.right-bottom > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.top-left > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.top-right > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.bottom-left > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.bottom-right > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.left-top > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.left-bottom > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.right-top > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.right-bottom > .tooltip-arrow,[uib-popover-popup].popover.top-left > .arrow,[uib-popover-popup].popover.top-right > .arrow,[uib-popover-popup].popover.bottom-left > .arrow,[uib-popover-popup].popover.bottom-right > .arrow,[uib-popover-popup].popover.left-top > .arrow,[uib-popover-popup].popover.left-bottom > .arrow,[uib-popover-popup].popover.right-top > .arrow,[uib-popover-popup].popover.right-bottom > .arrow,[uib-popover-html-popup].popover.top-left > .arrow,[uib-popover-html-popup].popover.top-right > .arrow,[uib-popover-html-popup].popover.bottom-left > .arrow,[uib-popover-html-popup].popover.bottom-right > .arrow,[uib-popover-html-popup].popover.left-top > .arrow,[uib-popover-html-popup].popover.left-bottom > .arrow,[uib-popover-html-popup].popover.right-top > .arrow,[uib-popover-html-popup].popover.right-bottom > .arrow,[uib-popover-template-popup].popover.top-left > .arrow,[uib-popover-template-popup].popover.top-right > .arrow,[uib-popover-template-popup].popover.bottom-left > .arrow,[uib-popover-template-popup].popover.bottom-right > .arrow,[uib-popover-template-popup].popover.left-top > .arrow,[uib-popover-template-popup].popover.left-bottom > .arrow,[uib-popover-template-popup].popover.right-top > .arrow,[uib-popover-template-popup].popover.right-bottom > .arrow{top:auto;bottom:auto;left:auto;right:auto;margin:0;}[uib-popover-popup].popover,[uib-popover-html-popup].popover,[uib-popover-template-popup].popover{display:block !important;}</style>'
        ),
      (angular.$$uibTooltipCss = !0);
  }),
  angular.module("ui.bootstrap.timepicker").run(function() {
    !angular.$$csp().noInlineStyle &&
      !angular.$$uibTimepickerCss &&
      angular
        .element(document)
        .find("head")
        .prepend(
          '<style type="text/css">.uib-time input{width:50px !important;}</style>'
        ),
      (angular.$$uibTimepickerCss = !0);
  }),
  angular.module("ui.bootstrap.typeahead").run(function() {
    !angular.$$csp().noInlineStyle &&
      !angular.$$uibTypeaheadCss &&
      angular
        .element(document)
        .find("head")
        .prepend(
          '<style type="text/css">[uib-typeahead-popup].dropdown-menu{display:block;}</style>'
        ),
      (angular.$$uibTypeaheadCss = !0);
  });
