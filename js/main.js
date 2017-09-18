$(document).ready(function(){

        let contact_list = $('#contact_list');
        let newContact__form = $('#newContact__form');
        let newContactAdd__button = $('#newContactAdd__button');
        let newContact = $('#newContact');



//установка функций на кнопку "создать контакт"
        newContactAdd__button.on('click', function () {

            contact_list.hide();
            newContactAdd__button.hide();
            newContact.show();
            let searchDiv = $('#searchDiv');
            searchDiv.hide();
        });


        //маска телефона


    $('#mobile1').mask('(999) 999 - 99 - 99');

//кнопка в форме "добавить еще 1 телефон"
        $('#addNewMobile').on('click', function () {
            let Br = $('<br />');
            let newMobileItemInput = $('<input />');
            let addNewMobile = $('#addNewMobile');
            let mobile__section = $('#mobile__section');
            newMobileItemInput.attr('type', 'tel');
            newMobileItemInput.addClass('mobile');
            newMobileItemInput.attr('placeholder', '(___) ___ __ __');
            newMobileItemInput.attr('id', 'mobile1');

            $(newMobileItemInput).mask('(999) 999 - 99 - 99');

             mobile__section.append(newMobileItemInput, addNewMobile);


        });


    //проверка исходного импута с почтой
    $('#email1').on('blur', function() {
        if($(this).val() != '') {
            let pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
            if(pattern.test($(this).val())){
                $(this).css({'border' : '1px solid #569b44'});


            } else {
                $(this).css({'border' : '1px solid #ff0000'});

            }

        } else {
            $(this).css({'border' : '1px solid #ff0000'});

        }
    });






    //кнопка в форме "добавить еще 1 email"
        $('#addNewEmail').on('click', function () {
            let Br = $('<br />');
            let newEmailItemInput = $('<input />');
            newEmailItemInput.attr('type', 'email');
            newEmailItemInput.addClass('email');
            let email__section =  $('#email__section');
            let addNewEmail = $('#addNewEmail');
            email__section.append(newEmailItemInput, addNewEmail );



            (newEmailItemInput).on('blur', function() {
                if($(this).val() != '') {
                    let pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                    if(pattern.test($(this).val())){
                        $(this).css({'border' : '1px solid #569b44'});

                    } else {
                        $(this).css({'border' : '1px solid #ff0000'});

                    }

                } else {
                    $(this).css({'border' : '1px solid #ff0000'});

                }
            });




        });


        //кнопка в форме "добавить еще 1 адрес"
    $('#addNewAdress').on('click', function () {
            let Br = $('<br />');
            let newAdressItemInput = $('<input />');
            newAdressItemInput.attr('type', 'text');
            newAdressItemInput.addClass('text');
            newAdressItemInput.addClass('adress');
            let adress__section = $('#adress__section');
            let addNewAdress = $('#addNewAdress');
            adress__section.append(newAdressItemInput, addNewAdress );


        });

        //кнопка "сохранить"
    $('#newContact__submit').on('click', function () {


            let a = {};
            a.name = [];
            a.mobile = [];
            a.email = [];
            a.adress = [];


            for (let i = 0; i < $('.name').length; i++) {
                let checkName = $('.name').eq(i).val();

                if (checkName !== '') {
                    a.name.push(checkName);
                }

            }



            for (let i = 0; i < $('.mobile').length; i++) {

                let checkMob = $('.mobile').eq(i).val();

                if (checkMob !=='') {
                   a.mobile.push(checkMob);
                }


            }

            for (let i = 0; i < $('.email').length; i++) {

                let checkEmail = $('.email').eq(i).val();

                    if (checkEmail !=='') {
                        a.email.push(checkEmail);
                    }


            }

            for (let i = 0; i < $('.adress').length; i++) {

                let checkAdress = $('.adress').eq(i).val();

                if (checkAdress !=='')  {
                    a.adress.push(checkAdress);
                }

            }

            let KeyId = new Date().getTime();
            a.KeyId = KeyId;


            console.log(a.name[0]);

           if (a.name[0] !== undefined) {
                localStorage.setItem(a.KeyId, JSON.stringify(a)); //it  works too :)
                location.reload();
            } else {alert('Для сохранения необходимо внести имя контакта!'  )}


        });



        //выводим в HTML списком все контакты
        for (let i=0; i<localStorage.length; i++) {
            let contactName = localStorage.key(i); //здесь выводим ID , а нужно имя
            let user = localStorage.getItem(contactName);
            user = JSON.parse(user);
            let nameFromId = user.name;

            let contact = $('<li />');
            contact.addClass('contactListItem');
            contact.attr('id', 'contactListItem');
            let contactText = $('<span />');

            contactText.text(nameFromId);
            contactText.addClass('nameInSpan');
            contact_list.append(contact);
//конец вывода в тексте



//кнопка "детальнее"
            let detailedButton = $('<a />');
            detailedButton.attr('id', 'detailedButton');
            detailedButton.html('<img src="images/icons/001-person-business-card.png" alt="Детальнее">');

            contact.append(contactText);
            contact.append(detailedButton);

            detailedButton.on('click', function () {

                contact_list.hide();
                newContactAdd__button.hide();
                let searchDiv = $('#searchDiv');
                searchDiv.hide();


                for (let i = 0; i<user.name.length; i++) {
                    let detailedForm = $('#detailedForm');
                    let usertesr = user.name[i]; //то что нужно вписывать


                    let newDetailedItem = $('<input />');
                    let br = $('<br />');
                    newDetailedItem.attr('value', user.name[i]);
                    newDetailedItem.addClass('name detailedInput');
                    newDetailedItem.attr('readonly', 'readonly');
                    detailedForm.append(newDetailedItem);
                    detailedForm.append(br);

                }

                for (let i = 0; i<user.mobile.length; i++) {
                    let detailedForm = $('#detailedForm');
                    let usertesr = user.mobile[i]; //то что нужно вписывать


                    let newDetailedItem = $('<input />');
                    let br = $('<br />');
                    newDetailedItem.attr('value', user.mobile[i]);
                    newDetailedItem.addClass('mobile detailedInput');
                    newDetailedItem.attr('readonly', 'readonly');

                    let spanMobile = $('<span />');
                    spanMobile.text('Телефон');


                    detailedForm.append(spanMobile);
                    detailedForm.append(newDetailedItem);
                    detailedForm.append(br);
                }

                for (let i = 0; i<user.adress.length; i++) {
                    let detailedForm = $('#detailedForm');
                    let usertesr = user.adress[i]; //то что нужно вписывать

                    let newDetailedItem = $('<input />');
                    let br = $('<br />');
                    newDetailedItem.attr('value', user.adress[i]);
                    newDetailedItem.addClass('adress detailedInput');
                    newDetailedItem.attr('readonly', 'readonly');

                    let spanAdress = $('<span />');
                    spanAdress.text('Адрес');

                    detailedForm.append(spanAdress)
                    detailedForm.append(newDetailedItem);
                    detailedForm.append(br);
                }
                for (let i = 0; i<user.email.length; i++) {
                    let detailedForm = $('#detailedForm');
                    let usertesr = user.email[i]; //то что нужно вписывать


                    let newDetailedItem = $('<input />');
                    let br = $('<br />');
                    newDetailedItem.attr('value', user.email[i]);
                    newDetailedItem.addClass('email detailedInput');
                    newDetailedItem.attr('readonly', 'readonly');


                    let spanEmail = $('<span />');
                    spanEmail.text('E-mail');

                    detailedForm.append(spanEmail);
                    detailedForm.append(newDetailedItem);
                    detailedForm.append(br);
                }

//кнопка "детальная форма контакта"

                let editButton = $('<a />');
                editButton.attr('id', 'editButton');
                editButton.html('<img src="images/icons/edit.png" alt="Детальнее">');


                let detailedForm = $('#detailedForm');
                detailedForm.append(editButton);

                let deleteButton = $('<a />');
                deleteButton.text("Видалити");
                deleteButton.attr('id', 'deleteButton');
                deleteButton.html('<img src="images/icons/delete-button.png" alt="Удалить контакт">');
                detailedForm.append(deleteButton);





                let goBackButton = $('<a />');
                goBackButton.attr('id', 'goBackButton');
                goBackButton.html('<img src="images/icons/002-back-arrow.png" alt="Назад">');
                detailedForm.append(goBackButton);

//кнопка "назад"
                goBackButton.on('click', function () {
                    location.reload();
                });


                //кнопка "регактировать"
                editButton.on('click', function () {

                    newContact.show();
                    let detailedForm = $('#detailedForm');
                    detailedForm.hide(); ////!!!снять коммент


                    //удаление старых полей с формы создания контакта
                    let oldNameSection = $('#name__section');
                    let oldNameLabel = $('#name__label');
                    let oldName = $('#name');
                    oldNameSection.empty(oldNameLabel);
                    oldNameSection.empty(oldName);


                    let oldMobileSection = $('#mobile__section');
                    let oldMobileLabel = $('#mobile__label');
                    let oldMobile = $('#mobile1');
                    oldMobileSection.empty(oldMobile);
                    oldMobileSection.empty(oldMobileLabel);

                    let oldEmailSection = $('#email__section');
                    let oldEmailLabel = $('#email__label');
                    let oldEmail = $('#mail1');
                    oldEmailSection.empty(oldEmail);
                    oldEmailSection.empty(oldEmailLabel);

                    let oldAdressSection = $('#adress__section');
                    let oldAdressLabel = $('#adress__label');
                    let oldAdress = $('#adress1');
                    oldAdressSection.empty(oldAdress);
                    oldAdressSection.empty(oldAdressLabel);



                    let OldNewContact__submit__form = $('#newContactSubmitForm'); //общий див с кнопкой сохранить
                    let OldNewContact__submit = $('#newContact__submit'); //заменяем эту кнопку
                    OldNewContact__submit.remove();



                    for (i = 0; i < user.name.length; i++) {
                        let name__section = $('#name__section'); //отбор секции моб
                        let span = $('<span />');
                        span.innerText = 'ім\'я';
                        let nameInput = $('<input />');
                        nameInput.attr('type', 'text');
                        nameInput.attr('id', 'name');
                        nameInput.addClass('secondName');
                        nameInput.attr('name', 'name');
                        nameInput.val(user.name[i]);

                        let Br = $('<br />');

                        name__section.append(Br);
                        name__section.append(nameInput);
                        name__section.append(span);

                    }

//заполнение имен с локалсторредж
                    for (i = 0; i < user.mobile.length; i++) {

                        let mobile__section = $('#mobile__section'); //отбор секции моб
                        let span = $('<span />');
                        span.innerText = 'Телефон';
                        let mobileInput = $('<input />');
                        mobileInput.attr('type', 'text');
                        mobileInput.attr('id', 'mobile');
                        mobileInput.addClass('secondMobile');
                        mobileInput.attr('name', 'mobile');
                        mobileInput.val(user.mobile[i]);


                        //кнопака удалить телефон

                        let deleteCurrentMobile = $('<a />');
                        deleteCurrentMobile.attr('id', 'deleteCurrentMobile');
                        deleteCurrentMobile.html('<img src="images/icons/001-cancel-button.png" alt="Удалить телефон">');
                        // deleteCurrentMobile.text('удалить нахер');

                        let Br = $('<br />');


                        mobile__section.append(Br);
                        mobile__section.append(mobileInput);
                        mobile__section.append(deleteCurrentMobile);
                        mobile__section.append(span);

                        $(mobileInput).mask('(999) 999 - 99 - 99');

                         deleteCurrentMobile.on('click', function () {
                            $(this).prev(mobileInput).remove();
                            $(this).remove();

                        })



                    }

                    let addNewMobileEdition = $('<a />'); //новая кнопка
                    addNewMobileEdition.attr('id','addNewMobileEdition');
                    addNewMobileEdition.html('<img src="images/icons/004-add-call.png" alt="Добавить телефон">');
                    let mobile__section = $('#mobile__section');
                    mobile__section.append(addNewMobileEdition);



                    //кнопка


                    $('#addNewMobileEdition').on('click', function () {
                        let Br = $('<br />');
                        let newMobileItemInput = $('<input />');
                        let addNewMobile = $('#addNewMobile');
                        let mobile__section = $('#mobile__section');
                        newMobileItemInput.attr('type', 'text');
                        newMobileItemInput.addClass('secondMobile');
                        newMobileItemInput.attr('placeholder', '(___) ___ - __ - __');

                        $(newMobileItemInput).mask('(999) 999 - 99 - 99');

                        mobile__section.append(newMobileItemInput, addNewMobile);

                    });


                    for (i = 0; i < user.email.length; i++) {

                        let email__section = $('#email__section'); //отбор секции моб
                        let span = $('<span />');
                        span.innerText = 'email';
                        let emailInput = $('<input />');
                        emailInput.attr('type', 'text');
                        emailInput.attr('id', 'email');
                        emailInput.addClass('secondEmail');
                        emailInput.attr('name', 'email');
                        emailInput.val(user.email[i]);

                        let Br = document.createElement('br');


                        let deleteCurrentEmail= $('<a />');
                        deleteCurrentEmail.attr('id', 'deleteCurrentEmail');
                        deleteCurrentEmail.html('<img src="images/icons/001-cancel-button.png" alt="Удалить почту">');

                        email__section.append(Br);
                        email__section.append(emailInput);
                        email__section.append(deleteCurrentEmail);
                        email__section.append(span);


                        deleteCurrentEmail.on('click', function () {
                            $(this).prev(emailInput).remove();
                            $(this).remove();

                        })


                    }

//кнопка имейла
                    let addNewEmailEdition = $('<a />'); //новая кнопка
                    addNewEmailEdition.attr('id','addNewEmailEdition');
                    addNewEmailEdition.html('<img src="images/icons/003-email-add-.png" alt="Добавить почту">');
                    let email__section = $('#email__section');
                    email__section.append(addNewEmailEdition);




                    //кнопка в форме "добавить еще 1 email"
                    $('#addNewEmailEdition').on('click', function () {
                        let Br = $('<br />');
                        let newEmailItemInput = $('<input />');
                        newEmailItemInput.attr('type', 'email');
                        newEmailItemInput.addClass('secondEmail');
                        let email__section =  $('#email__section');
                        let addNewEmail = $('#addNewEmail');
                        email__section.append(newEmailItemInput, addNewEmail );


                    });


                    //проверка исходного импута с почтой
                    $('.secondEmail').on('blur', function() {
                        if($(this).val() != '') {
                            let pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                            if(pattern.test($(this).val())){
                                $(this).css({'border' : '1px solid #569b44'});

                            } else {
                                $(this).css({'border' : '1px solid #ff0000'});

                            }

                        } else {
                            $(this).css({'border' : '1px solid #ff0000'});
                           }
                    });



                    for (i = 0; i < user.adress.length; i++) {
                        let adress__section = $('#adress__section'); //отбор секции моб
                        let span = $('<span />');
                        span.innerText = 'адреса';
                        let adressInput = $('<input />');
                        adressInput.attr('type', 'text');
                        adressInput.attr('id', 'adress');
                        adressInput.addClass('secondAdress');
                        adressInput.attr('name', 'adress');
                        adressInput.val(user.adress[i]);

                        let Br = $('<br />');

                        let deleteCurrentAdress= $('<a />');
                        deleteCurrentAdress.attr('id', 'deleteCurrentAdress');
                        deleteCurrentAdress.html('<img src="images/icons/001-cancel-button.png" alt="Удалить почту">');

                        adress__section.append(Br);
                        adress__section.append(adressInput);
                        adress__section.append(deleteCurrentAdress);
                        adress__section.append(span);

                        deleteCurrentAdress.on('click', function () {
                            $(this).prev(adressInput).remove();
                            $(this).remove();

                        })



                    }



                    //кнопка имейла
                    let addNewAdressEdition = $('<a />'); //новая кнопка
                    addNewAdressEdition.attr('id','addNewAdressEdition');
                    addNewAdressEdition.html('<img src="images/icons/002-add-location-point.png" alt="Добавить адрес">');
                    let adress__section = $('#adress__section');
                    adress__section.append(addNewAdressEdition);




                    //кнопка в форме "добавить еще 1 email"
                    $('#addNewAdressEdition').on('click', function () {
                        let Br = $('<br />');
                        let newAdressItemInput = $('<input />');
                        newAdressItemInput.attr('type', 'text');
                        newAdressItemInput.addClass('secondAdress');
                        let adress__section =  $('#adress__section');
                        let addNewAdress = $('#addNewAdress');
                       // email__section.appendChild(newMobileItemInput);
                        adress__section.append(newAdressItemInput, addNewAdress );


                    });


                    let newContactSubmitForm = $('#newContactSubmitForm');
                    let newSaveButton = $('<a />');
                    newSaveButton.html('<img src="images/icons/save-disk.png" alt="Сохранить изменения">');
                    newSaveButton.addClass('newSaveButton');

                    //сохранение контакта после изменений


                    newContactSubmitForm.append(newSaveButton);

                    newSaveButton.on('click', function () {

                        let a = {};

                        a.name = [];
                        a.mobile = [];
                        a.email = [];
                        a.adress = [];


                        for (let i = 0; i <  $('.secondName').length; i++) {
                            let testName = $('.secondName');
                            a.name[i] = testName.eq(i).val();
                        }


                        for (let i = 0; i <  $('.secondMobile').length; i++) {
                           let checkMobSecond = $('.secondMobile').eq(i).val();

                            if (checkMobSecond !=='') {
                                //         // console.log(checkMob);
                                        a.mobile.push(checkMobSecond);
                                    }

                                               }


                        for (let i = 0; i <  $('.secondEmail').length; i++) {

                            let checkEmailSecond = $('.secondEmail').eq(i).val();
                            if (checkEmailSecond !=='') {
                               a.email.push(checkEmailSecond);
                            }

                        }


                        for (let i = 0; i <  $('.secondAdress').length; i++) {
                            let checkEmailAdress = $('.secondAdress').eq(i).val();
                            if (checkEmailAdress !=='') {
                                a.adress.push(checkEmailAdress);
                            }


                        }

                        a.KeyId = user.KeyId;


                        localStorage.setItem(a.KeyId, JSON.stringify(a)); //it  works too :)
                        location.reload();


                    });


                    //функции на новые кнопки


                    $('#addNewMobile').on('click', function () {
                        let Br = $('<br />');
                        let newMobileItemInput = $('<input />');
                        let addNewMobile = $('#addNewMobile');
                        let mobile__section = $('#mobile__section');
                        newMobileItemInput.attr('type', 'text');
                        newMobileItemInput.addClass('secondMobile');
                        newMobileItemInput.attr('placeholder', '(___) ___ - __ - __')

                        $(newMobileItemInput).mask('(999) 999 - 99 - 99');


                    });

                    $('#addNewEmail').on('click', function () {
                        let Br = $('<br />');
                        let newEmailItemInput = $('<input />');
                        newEmailItemInput.attr('type', 'email');
                        newEmailItemInput.addClass('email');
                        let email__section =  $('#email__section');
                        let addNewEmail = $('#addNewEmail');
                    });



                    $('#addNewAdress').on('click', function () {
                        let Br = $('<br />');
                        let newAdressItemInput = $('<input />');
                        newAdressItemInput.attr('type', 'text');
                        newAdressItemInput.addClass('text');
                        let adress__section = $('#adress__section');
                        let addNewAdress = $('#addNewAdress');
                    });

                });


//кнопка "удалить"
                deleteButton.on('click', function () {
                    let contactName = localStorage.key(i);
                    localStorage.removeItem(contactName);
                    location.reload();

                })

            })
        }


        $('#newContact__cancel').on('click', function () {
            contact_list.hide();
            newContactAdd__button.show();
            newContact.hide();
            location.reload();
        });




    let search = $('#search');

    search.on('input', function () {

        let search = $('#search'); // input поиска
        let nameInSearch = search.val();//слово в поиске
        let nameInSearchLowerCase = nameInSearch.toLowerCase();
        console.log(nameInSearchLowerCase); //!! пониженное слово из поиска


        let contactListItem = $('.contactListItem'); // сам СПАН в списке конатктов ///!!!

        for (i = 0; i < contactListItem.length; i++) {

            let test1 = $('.nameInSpan').eq(i).text();
            let test1LowerCase = test1.toLowerCase();
            console.log(test1LowerCase);
            console.log(test1LowerCase.indexOf(nameInSearchLowerCase));

            let searchCheck = test1LowerCase.indexOf(nameInSearchLowerCase);



            if (searchCheck === -1) {
                contactListItem.eq(i).hide();
            } else {
                contactListItem.eq(i).show();
            }
        }




    });



});

