$(function(){

    $("#submit_btn").on("click",function(e){
        e.preventDefault();
        let post_code = $("#post_code").val();
        zipCloud(post_code);
    });

    function zipCloud(post_code){
        let url =`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${post_code}`;

        fetch(url)
        .then(response => response.json())
        .then((data) =>{
            if(!data.results){
                render_error(data.message);
            }else{
                console.log(data);
                let results = data.results;
                let results_data = results["0"];
                // 
                let format_address = [results_data.address1,results_data.address2,results_data.address3];
                render_html(format_address);
            }
        })


    }
    

    function render_html(format_address){
        // 
        $("#prefecture").val(format_address[0]);
        $("#city").val(format_address[1]);
        $("#street").val(format_address[2]);
    }
    function render_error(message){
        $("#address").text(message);
    }

})