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

    // slide
    function initializeSlider(selector, options = {}) {
        const slider = document.querySelector(selector);
        if (slider) {

            const slide = slider.querySelector('.slider-wrapper');
            const items = Array.from(slide.children);
            const prevButton = slider.querySelector('.slider-button-prev');
            const nextButton = slider.querySelector('.slider-button-next');
            const paginationContainer = slider.querySelector('.slider-pagination');
            let currentIndex = 0;
            let autoSlideInterval;

            function setItemsToShow() {
                const isMobile = window.innerWidth <= (options.mobileBreakpoint || 768); // Sử dụng điểm ngắt từ options
                const sliderSize = slider.getAttribute('data-vertical') === 'true' ? slider.clientHeight : slider.clientWidth;
                let itemsToShow;

                if (isMobile) {
                    itemsToShow = parseInt(slider.getAttribute('data-pageMobile')) || 1;
                } else {
                    if (slider.getAttribute('data-page') === 'auto') {
                        const itemSize = slider.getAttribute('data-vertical') === 'true' ? items[0].offsetHeight + 10 : items[0].offsetWidth + 10;
                        itemsToShow = Math.floor(sliderSize / itemSize);
                    } else {
                        itemsToShow = parseInt(slider.getAttribute('data-page')) || 1;
                    }
                }

                return itemsToShow;
            }

            function setSlideSize() {
                const itemsToShow = setItemsToShow();
                const sliderSize = slider.getAttribute('data-vertical') === 'true' ? slider.clientHeight : slider.clientWidth;
                const itemSize = (sliderSize / itemsToShow) - 10; // Trừ margin

                items.forEach(item => {
                    if (slider.getAttribute('data-vertical') === 'true') {
                        item.style.height = `${itemSize}px`;
                    } else {
                        item.style.width = `${itemSize}px`;
                    }
                });

                if (slider.getAttribute('data-vertical') === 'true') {
                    slide.style.height = `${items.reduce((totalHeight, item) => totalHeight + item.offsetHeight + 10, 0)}px`;
                } else {
                    slide.style.width = `${items.reduce((totalWidth, item) => totalWidth + item.offsetWidth + 10, 0)}px`;
                }
            }

            function updatePagination() {
                if (paginationContainer) {
                    paginationContainer.innerHTML = '';
                    const itemsToShow = setItemsToShow();
                    const totalPages = Math.ceil(items.length / itemsToShow);

                    if (items.length <= itemsToShow) {
                        paginationContainer.style.display = 'none';
                        if (prevButton) prevButton.style.display = 'none';
                        if (nextButton) nextButton.style.display = 'none';
                        return;
                    } else {
                        paginationContainer.style.display = 'flex';
                        if (prevButton) prevButton.style.display = 'block';
                        if (nextButton) nextButton.style.display = 'block';
                    }

                    for (let i = 0; i < totalPages; i++) {
                        const dot = document.createElement('span');
                        dot.classList.add('pagination-dot');
                        if (i === currentIndex) {
                            dot.classList.add('active');
                        }
                        dot.addEventListener('click', () => {
                            currentIndex = i;
                            updateSlider();
                        });
                        paginationContainer.appendChild(dot);
                    }
                }

            }

            function updateSlider() {
                const itemsToShow = setItemsToShow();
                const sliderSize = slider.getAttribute('data-vertical') === 'true' ? slider.clientHeight : slider.clientWidth;
                const totalPages = Math.ceil(items.length / itemsToShow);

                if (currentIndex >= totalPages) {
                    currentIndex = totalPages - 1;
                }
                if (currentIndex < 0) {
                    currentIndex = 0;
                }

                let translateSize = 0;
                for (let i = 0; i < currentIndex * itemsToShow; i++) {
                    translateSize += slider.getAttribute('data-vertical') === 'true' ? items[i].offsetHeight + 10 : items[i].offsetWidth + 10;
                }

                const maxTranslateSize = slider.getAttribute('data-vertical') === 'true' ? slide.scrollHeight - slider.clientHeight : slide.scrollWidth - slider.clientWidth;
                translateSize = Math.min(translateSize, maxTranslateSize);

                slide.style.transform = slider.getAttribute('data-vertical') === 'true' ? `translateY(-${translateSize}px)` : `translateX(-${translateSize}px)`;

                updatePagination();
            }

            if (nextButton) {
                nextButton.addEventListener('click', () => {
                    const itemsToShow = setItemsToShow();
                    const totalPages = Math.ceil(items.length / itemsToShow);
                    currentIndex++;
                    if (currentIndex >= totalPages) {
                        currentIndex = slider.getAttribute('data-loop') === 'true' ? 0 : totalPages - 1;
                    }
                    updateSlider();
                });
            }

            if (prevButton) {
                prevButton.addEventListener('click', () => {
                    const itemsToShow = setItemsToShow();
                    const totalPages = Math.ceil(items.length / itemsToShow);
                    currentIndex--;
                    if (currentIndex < 0) {
                        currentIndex = slider.getAttribute('data-loop') === 'true' ? totalPages - 1 : 0;
                    }
                    updateSlider();
                });
            }
            if (slider.getAttribute('data-autoSlider') === 'true') {
                autoSlideInterval = setInterval(() => {
                    if (nextButton) nextButton.click();
                }, 3000);

                slider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
                slider.addEventListener('mouseleave', () => autoSlideInterval = setInterval(() => {
                    if (nextButton) nextButton.click();
                }, 3000));
            }

            setSlideSize();
            updateSlider();

            window.addEventListener('resize', () => {
                setSlideSize();
                updateSlider();
            });
        }
    }
    initializeSlider('#slider-1');
    initializeSlider('#slider-2');
    // end slide

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
                    10: 30,
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
                    10: 20,
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
                    10: 0,
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
                    10: 30,
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
