$(document).ready(function () {
    var locale = {
        "name": "ru",
        "options": {
            "months": [
                "Январь",
                "Февраль",
                "Март",
                "Апрель",
                "Май",
                "Июнь",
                "Июль",
                "Август",
                "Сентябрь",
                "Октябрь",
                "Ноябрь",
                "Декабрь"
            ],
            "shortMonths": [
                "Янв",
                "Фев",
                "Мар",
                "Апр",
                "Май",
                "Июн",
                "Июл",
                "Авг",
                "Сен",
                "Окт",
                "Ноя",
                "Дек"
            ],
            "days": [
                "Воскресенье",
                "Понедельник",
                "Вторник",
                "Среда",
                "Четверг",
                "Пятница",
                "Суббота"
            ],
            "shortDays": ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
            "toolbar": {
                "exportToSVG": "Сохранить SVG",
                "exportToPNG": "Сохранить PNG",
                "exportToCSV": "Сохранить CSV",
                "menu": "Меню",
                "selection": "Выбор",
                "selectionZoom": "Выбор с увеличением",
                "zoomIn": "Увеличить",
                "zoomOut": "Уменьшить",
                "pan": "Перемещение",
                "reset": "Сбросить увеличение"
            }
        }
    };
    Apex.chart = {
        locales: [locale],
        defaultLocale: 'ru'
    }

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });

    $('.back-to-top').click(function () {
        $('html, body').animate({
            scrollTop: $('#main-grid').offset().top
        }, 500);
        return false;
    });

    /**
     * APEXCHARTS
     */

    // CUSTOM FUNCTIONS
    function getAnnoAssoc(listOfLabels, listOfAnnotations) {
        var annoAssoc = [];
        listOfAnnotations.forEach(function (elem, i) {
            annoAssoc.push({
                x: listOfLabels[i],
                borderColor: 'transparent',
                label: {
                    position: 'middle',
                    borderColor: 'transparent',
                    offsetX: 15,
                    style: {
                        background: 'transparent',
                        fontSize: 14,
                        fontWeight: 'bold'
                    },
                    text: listOfAnnotations[i]
                }
            })
        });
        return annoAssoc;
    }

    function splitNames(listOfLabels) {
        listOfLabels.forEach(function (elem, i) {
            listOfLabels[i] = elem.split(' ')
        });
        return listOfLabels
    }

    // BASIC_CHART_PARAMETERS
    var listOfData;
    var listOfLabels;
    var listOfAnnotations;
    var annoAssoc;
    var options;

    var chart;
    // -------------------------------------------------- CHART 1 - COLUMN ---------------------------------------------------------
    // CHART_PARAMETERS
    listOfData = [100, 97, 95, 300];
    listOfLabels = splitNames(["Цифровая зрелость", "Доступ в Интернет", "Цифровые услуги", "Отечественное ПО (к 2019 году)"]);
    listOfAnnotations = ["ключевые отрасли", "домохозяйства", "госуслуги", "спрос"];
    annoAssoc = getAnnoAssoc(listOfLabels, listOfAnnotations);

    options = {
        series: [{
            name: 'Показатель',
            data: listOfData
        }],
        chart: {
            height: '100%',
            type: 'bar',
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                dataLabels: {
                    position: 'top', // top, center, bottom
                },
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val + "%";
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ["#304758"]
            }
        },
        xaxis: {
            categories: listOfLabels,
            position: 'bottom',
            labels: {
                style: {
                    fontSize: '14px'
                },
                hideOverlappingLabels: false
            },
            tooltip: {
                enabled: false,
            }
        },
        yaxis: {
            labels: {
                show: true,
                formatter: function (val) {
                    return val + "%";
                }
            },
            tooltip: {
                enabled: false
            }
        },
        annotations: {
            xaxis: annoAssoc
        }
    };

    // CHART_RENDER
    chart = new ApexCharts(document.querySelector("#chart-1"), options);
    chart.render();

    // -------------------------------------------------- CHART 2 - BAR ---------------------------------------------------------

    listOfData = [[13.3, 3.6, 3.6], [590.7, 1089.2, 397.7]];
    listOfLabels = [2022, 2023, 2024];
    options = {
        series: [{
            name: 'Федеральный бюджет',
            data: listOfData[0]
        }, {
            name: 'Региональный бюджет',
            data: listOfData[1]
        }],
        chart: {
            type: 'bar',
            stacked: true,
            height: 300
        },
        plotOptions: {
            bar: {
                horizontal: true,
                borderRadius: 10,
            },
        },
        xaxis: {
            categories: listOfLabels,
        },
        legend: {
            position: 'bottom',
            horizontalAlign: 'left',
            offsetX: 40
        },
        theme: {
            palette: 'palette2'
        }
    };

    chart = new ApexCharts(document.querySelector("#chart-2"), options);
    chart.render();


    // -------------------------------------------------- CHART 3 - BAR + INTERACTIVE ------------------------------------------
    listOfData = [[79, 73], [21, 27]];
    listOfLabels = ['Образование', 'Государственное управление'];
    options = {
        series: [{
            name: 'Выполнено',
            data: listOfData[0]
        }, {
            name: 'Невыполнено',
            data: listOfData[1]
        }],
        chart: {
            type: 'bar',
            height: 300,
            stacked: true,
            stackType: '100%'
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        stroke: {
            width: 1,
            colors: ['#fff']
        },
        xaxis: {
            categories: listOfLabels,
            labels: {
                show: false,
            }
        },
        tooltip: {
            enabled: false,
        },
        fill: {
            opacity: 1

        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40
        },
        theme: {
            palette: 'palette3'
        }
    };

    chart = new ApexCharts(document.querySelector("#chart-3"), options);
    chart.render();

});
