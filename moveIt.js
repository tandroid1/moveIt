!function($){
  "use strict";

  $.fn.moveIt = function(moveItems, bpDefault) {
    var $win = $(window),
      base = this,
      itemsMovedThere = 0,
      itemsMovedBack = 0;

    function MoveItem(moveItem) {
      this.isMoved = false;
      this.breakpoint = moveItem.breakpoint || bpDefault;
      this.position =  moveItem.position || 'after';
      this.bpDirection = moveItem.bpDirection || 'min-width';

      var itemBase = this,
        $target = $(base).find(moveItem.moveTo),
        $el = base.find(moveItem.el),
        $elParent = $el.parent(),
        elIndex = $el.index(),

      /**
       * Move the item to the location specified in options.
       */
      this.moveThere = function() {
        switch (this.position) {
          case 'before':
            $target.before($el);
            break;
          case 'after':
            $target.after($el);
            break;
          case 'append':
            $target.append($el);
            break;
          case 'prepend':
            $target.prepend($el);
            break;
          default:
            $target.after($el);
            break;
        }

        base.trigger('itemMovedThere');
        base.trigger('itemMoved');

        if (++itemsMovedThere == moveItems.length) {
          base.trigger('itemsMovedThere');
          itemsMovedThere = 0;
        }
        this.isMoved = true;
      };

      /**
       * Move item back to original location.
       */
      this.moveBack = function() {
        if (elIndex == 0) {
          $elParent.prepend($el);
        } else if (elIndex >= $elParent.children().length) {
          $elParent.append($el);
        } else if (elIndex > 0) {
          $elParent.children().eq(elIndex).before($el);
        }

        base.trigger('itemMoved');
        base.trigger('itemMovedBack');

        if (++itemsMovedBack == moveItems.length) {
          base.trigger('itemsMovedBack');
          itemsMovedBack = 0;
        }

        this.isMoved = false;
      };

      moveController($win.width());

      $win.resize(function() {
        moveController($win.width());
      });

      /**
       * Decides how to respond to the current window width.
       */
      function moveController(winWidth) {
        if (direction[itemBase.bpDirection](winWidth, itemBase.breakpoint)) {
          if (!itemBase.isMoved) {
            itemBase.moveThere();
          }
        } else {
          if (itemBase.isMoved) {
            itemBase.moveBack();
          }
        }
      }
    }

    function init() {
      var items = [];

      $.each(moveItems, function(i, moveItem) {
        var currentItem = new MoveItem(moveItem);
        items.push(currentItem);
      });
    }

    // Return a different operator based on the argument.
    var direction = {
      'max-width': function(a,b) {
        return a <= b;
      },
      'min-width': function(a,b) {
        return a >= b;
      }
    };

    init();
  };
}(jQuery);
