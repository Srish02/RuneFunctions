module.exports = async function (context, documents) {
    console.log(context);
    console.log(documents);

    if (!!documents && documents.length > 0) {
        context.log('Document Id: ', documents[0].id);
        
    }
}
