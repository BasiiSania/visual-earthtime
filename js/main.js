function dayOfYear(date) {
    return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000; }

function main_CurrentHidding(){
    var now = new Date();
    //var now = new Date(2019, 12, 11);
    var thisDayOfYear = dayOfYear(now);
    var hidingCurve = Math.round(40*Math.pow((-Math.cos(Math.PI * (thisDayOfYear+8)/89) + 3), 2) ); //ajusted manually
    $('.earth_time').css('background-size', hidingCurve.toString()+'vmin');
    var hidingDeg = Math.round(360*(now.getUTCHours() + (now.getUTCMinutes()/60))/24);

    var hidingPlace1 = Math.round(hidingCurve/3.8 - 27); //ajusted manually
    var hidingPlace2 = Math.round(hidingCurve/3.9 - 27); //ajusted manually
    if ((thisDayOfYear<81) || (thisDayOfYear>263)) {
        var divStr= "#earth_picture_north .earth_time";
        $(divStr).css('background-image', 'url("img/hiding_2.png")');
        $(divStr).css('background-position', '50% -'+hidingPlace1.toString()+'vmin');
        $(divStr).css('transform', 'rotate('+hidingDeg.toString()+'deg)');

        divStr= "#earth_picture_south .earth_time";
        $(divStr).css('background-position', '50% -'+hidingPlace2.toString()+'vmin');
        $(divStr).css('transform', 'rotate('+(hidingDeg+180).toString()+'deg)');
    }
    else {
        var divStr= "#earth_picture_north .earth_time";
        $(divStr).css('background-position', '50% -'+hidingPlace2.toString()+'vmin');
        $(divStr).css('transform', 'rotate('+hidingDeg.toString()+'deg)');
        $(divStr).css('transform', 'rotate('+(hidingDeg+180).toString()+'deg)');

        divStr= "#earth_picture_south .earth_time";
        $(divStr).css('background-image', 'url("img/hiding_2.png")');
        $(divStr).css('background-position', '50% -'+hidingPlace1.toString()+'vmin');
        $(divStr).css('transform', 'rotate('+hidingDeg.toString()+'deg)');
    }
}

main_CurrentHidding();
setInterval(main_CurrentHidding, 4*60*1000); // for 1/360 of a circle

var hoverTimeout;
$('.appbutton').hover(function() {
    clearTimeout(hoverTimeout);
    $(this).addClass('hovered');
}, function() {
    var $self = $(this);
    hoverTimeout = setTimeout(function() {
        $self.removeClass('hovered');
    }, 6000);
});
