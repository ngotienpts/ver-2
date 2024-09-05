document.addEventListener("DOMContentLoaded", function () {
    var bodyEle = document.querySelector("body");

    // change tab
    const tabOne = document.getElementById("tab-1");
    const tabTwo = document.getElementById("tab-2");
    const tabThree = document.getElementById("tab-3");
    const tabFor = document.getElementById("tab-4");
    const tabFive = document.getElementById("tab-5");
    const tabSix = document.getElementById("tab-6");
    const tabSeven = document.getElementById("tab-7");
    const tabEight = document.getElementById("tab-8");

    // sub menu
    const subMenus = document.querySelectorAll(".js__subMenuContainer");
    var showSearchMb = document.querySelector(".js__showSearchMb");
    var searchMbForm = document.querySelector(".js__searchMbSecondary");

    // slide
    var oneSlides = document.querySelectorAll(".js__swiperItemsContainer");
    var autoSlides = document.querySelectorAll(".js__swiperAutoContainer");
    var autoVerticalSlides = document.querySelectorAll(
        ".js__swiperAutoVeticalContainer"
    );
    var threeSlides = document.querySelectorAll(
        ".js__swiperThreeItemsContainer"
    );

    function switchTab(tabContainerId, tabId) {
        const tabsContainer = document.getElementById(tabContainerId);

        tabsContainer
            .querySelectorAll("[data-tab]")
            .forEach((tab) => tab.classList.remove("active"));
        tabsContainer
            .querySelectorAll("[data-pane]")
            .forEach((pane) => pane.classList.remove("active"));

        const clickedTab = tabsContainer.querySelector(`[data-tab="${tabId}"]`);
        const correspondingPane = tabsContainer.querySelector(
            `[data-pane="${tabId}"]`
        );

        clickedTab.classList.add("active");
        correspondingPane.classList.add("active");
    }

    document.querySelectorAll(".tab-container [data-tab]").forEach((tab) => {
        tab.addEventListener("click", function () {
            const tabContainerId = this.closest(".tab-container").id;
            const tabId = this.getAttribute("data-tab");
            switchTab(tabContainerId, tabId);
        });
    });

    const app = {
        // su ly cac su kien
        handleEvent: function () {
            const _this = this;

            // change tab
            if (tabOne) {
                tabOne.onclick = function () {
                    switchTab("tabs-container-1", "1");
                };
            }
            if (tabTwo) {
                tabTwo.onclick = function () {
                    switchTab("tabs-container-1", "2");
                };
            }
            if (tabThree) {
                tabThree.onclick = function () {
                    switchTab("tabs-container-1", "3");
                };
            }
            if (tabFor) {
                tabFor.onclick = function () {
                    switchTab("tabs-container-1", "4");
                };
            }
            if (tabFive) {
                tabFive.onclick = function () {
                    switchTab("tabs-container-2", "5");
                };
            }
            if (tabSix) {
                tabSix.onclick = function () {
                    switchTab("tabs-container-2", "6");
                };
            }
            if (tabSeven) {
                tabSeven.onclick = function () {
                    switchTab("tabs-container-3", "7");
                };
            }
            if (tabEight) {
                tabEight.onclick = function () {
                    switchTab("tabs-container-3", "8");
                };
            }

            // submenu
            if (subMenus) {
                subMenus.forEach((subMenu) => {
                    var menu = subMenu.querySelector(".js__subMenu");
                    var showSubMenu = subMenu.querySelector(".js__showSubMenu");
                    var closeSubMenu =
                        subMenu.querySelector(".js__closeSubMenu");

                    showSubMenu.onclick = function () {
                        menu.classList.add("active");
                        bodyEle.classList.add("overflow-hidden");
                    };
                    closeSubMenu.onclick = function () {
                        menu.classList.remove("active");
                        bodyEle.classList.remove("overflow-hidden");
                    };
                });
            }

            // searchMbContainers
            if (showSearchMb && searchMbForm) {
                showSearchMb.onclick = function () {
                    searchMbForm.classList.toggle("active");
                };
            }

            // hide cac element khi click ra ngoai
            // document.addEventListener("click", function (e) {

            // });
        },
        // slider one item
        sliderOneItems: function () {
            oneSlides.forEach((item) => {
                var pagi = item.querySelector(".swiper-pagination");
                var slider = item.querySelector(".js__swiperItems");
                new Swiper(slider, {
                    slidesPerView: 1,
                    spaceBetween: 30,
                    slidesPerGroup: 1,
                    autoHeight: true,
                    effect: "fade",
                    pagination: {
                        el: pagi,
                        clickable: true,
                    },
                });
            });
        },
        // slider auto
        sliderAutoItems: function () {
            autoSlides.forEach((item) => {
                var slider = item.querySelector(".js__swiperAuto");
                var next = item.querySelector(".swiper-button-next");
                var prev = item.querySelector(".swiper-button-prev");
                new Swiper(slider, {
                    slidesPerView: "auto",
                    spaceBetween: 20,
                    navigation: {
                        nextEl: next || null,
                        prevEl: prev || null,
                    },
                });
            });
        },
        // slider auto vertical
        sliderAutoVerticalItems: function () {
            autoVerticalSlides.forEach((item) => {
                var slider = item.querySelector(".js__swiperAutoVertical");
                var next = item.querySelector(".swiper-button-next");
                var prev = item.querySelector(".swiper-button-prev");
                new Swiper(slider, {
                    slidesPerView: "auto",
                    spaceBetween: 0,
                    direction: "vertical",
                    navigation: {
                        nextEl: next || null,
                        prevEl: prev || null,
                    },
                });
            });
        },
        // slider three items
        sliderThreeItems: function () {
            threeSlides.forEach((item) => {
                var slider = item.querySelector(".js__swiperThreeItems");
                var next = item.querySelector(".swiper-button-next");
                var prev = item.querySelector(".swiper-button-prev");
                new Swiper(slider, {
                    slidesPerView: 3,
                    spaceBetween: 30,
                    navigation: {
                        nextEl: next || null,
                        prevEl: prev || null,
                    },
                });
            });
        },


        // window scroll
        windowScroll: function () {
            var _this = this;
            window.onscroll = function () {
            };
        },

        // khoi tao function start
        start: function () {
            // su ly cac su kien
            this.handleEvent();
            // slider one item
            this.sliderOneItems();
            // slider auto
            this.sliderAutoItems();
            // slider auto vertical
            this.sliderAutoVerticalItems();
            // slider three items
            this.sliderThreeItems();
            // window scroll
            this.windowScroll();
        },
    };

    app.start();
});
