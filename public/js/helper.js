var CommonUtils = (function () {
    // Calls the print option
    var print = function () {
        window.print();
    }

    // Swith between tabs
    var setCurrentTab = function (e) {
        var element = e.target;

        if (element.classList.contains("active")) {
            return;
        }

        var tabListDiv = document.getElementsByClassName("tab-div");
        var tabList = document.getElementsByClassName("tab");

        for (var i = 0; i < tabList.length; i++) {
            tabList[i].classList.remove("active");
            tabListDiv[i].style.display = "none";
        }

        element.classList.add("active");
        document.getElementById(element.id + "-div").style.display = "block";
    }

    // Handles especif situations when Resizing 
    var onResize = function (e) {
        var currentWidth = window.innerWidth;
        var invoiceElement = document.getElementsByClassName("print-invoice");
        if (invoiceElement.length > 0) {
            invoiceElement[0].style.maxWidth = "1000px";

            if (currentWidth < 700) {
                invoiceElement.style.maxWidth = currentWidth + "px";
            }
        }
    }

    // inits behavior of some elements
    var init = function () {
        var tabList = document.getElementsByClassName("tab");
        for (var i = 0; i < tabList.length; i++) {
            tabList[i].addEventListener("click", setCurrentTab);
        }

        window.addEventListener('resize', onResize);
    }

    return {
        print,
        init
    };
})();

// Calls the init method when the DOM was loaded
document.addEventListener("DOMContentLoaded", CommonUtils.init);