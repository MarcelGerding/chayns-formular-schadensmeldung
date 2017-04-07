import React from 'react';
import './style.css';


/**
 * Import the desired components
 */
import { Input } from 'tobit-chayns_components/react-chayns-input';
import { Checkbox } from 'tobit-chayns_components/react-chayns-checkbox'
import { SelectButton } from 'tobit-chayns_components/react-chayns-selectbutton';
import Textarea from 'tobit-chayns_components/react-chayns-textarea';

export default class TemplateForm extends React.Component {

    static propTypes = {
        submit: React.PropTypes.func.isRequired,
        hideButton: React.PropTypes.bool
    };

    constructor() {
        super();
        /**
         *  Set form properties as object.
         *  Use the component event handlers to update these properties.
         *  The properties will be validated by the components themselves.
         */
        this.form = {
            Vorname: null,
            Nachname: null,
            Email: null,
            Telefon: null,
            VornameGeschädigter: null,
            NachnameGeschädigter: null,
            radio: 'Sonstiger Schaden',
            Anmerkung: 'keine Anmerkung',
            Ort: null,
            Datum: null,
            Fabrikat: 'keine Angaben',
            Kennzeichen: 'keine Angaben',
            Schadensart: 'keine Angaben',
            Wildunfall: 'Nein',
            Unfallaufgenommen: 'Nein',
            Schuld: 'keine Angaben',
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    /**
     * This method will be called when the submit button gets clicked and checks whether all properties set in the state got a value.
     * You can add additional security checks here.
     * Remember that some elements (like inputs) have their own methods to highlight those errors (See their documentation for more information).
     * If yes, the method onValid will be called. If no, onInvalid will be called.
     */
    onSubmit() {
        this._submit.classList.add('button--disabled');
        location.reload();
        if (this.isValid())
            this.props.submit ? this.props.submit(this.form) : null;
    }

        valueRadio() {
            if(this.refs.r1.checked){ this._hidden.classList.remove('hidden')
            }else{this._hidden.classList.add('hidden')} 
        if (this.refs.r1.checked) this.setValue('radio', this.refs.r1.value)
        else if (this.refs.r2.checked) this.setValue('radio', this.refs.r2.value)
        else if (this.refs.r4.checked) this.setValue('radio', this.refs.r4.value)

    }

    /**
     * Checks whether all required properties are set.
     * ( Strings are secured via the regExp on the input elements )
     */
    isValid() {
        let valid = true;
        Object.keys(this.form).forEach((key) => {
            if (this.form[key] === null)
                valid = false;
        });
        return valid;
    }

    /**
     * Adds a value to the form object. If the form is valid the button will get enabled in case it is not hidden.
     */
    setValue(key, value) {
        
        if(key == 'Wildunfall' || key == 'Unfallaufgenommen'){
            if(value){
                value = 'Ja';
            }else{
                value = 'Nein';
            }
        }
        this.form[key] = value;
        if (this.isValid())
            this._submit.classList.remove('button--disabled');
    }

    render() {
            let osList = [
            {
                id: 1,
                name: 'Geschädigter trägt keine Mitschuld'
            },
            {
                id: 2,
                name: 'Geschädigter trägt Teilschuld'
            },
            {
                id: 3,
                name: 'Geschädigter trägt volle Schuld'
            }
        ];  

        
        


        return (

            <div className ='content__card'>
                { /** here starts the custom form. add components and set the desired value to the form object*/}
                <div className='tapp__content'>
                <div>
                    <h2 className="headline">Ihre Kontaktdaten</h2>
                    <div class="input-group">
                <Input className='input' placeholder='*Vorname' type='text' responsive='true' id='Vorname' ref='Vorname' onKeyUp={value => { this.setValue('Vorname', value) } } />
                </div>
                <Input className='input' type='text' placeholder='*Nachname' responsive='true' id='Nachname' ref='Nachname' onKeyUp={value => { this.setValue('Nachname', value) } } />
                <Input className='input' placeholder='*E-Mail-Addresse' responsive='true' regExp="[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2}|[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b" type='text' id='Email' ref='Email' onKeyUp={value => { this.setValue('Email', value) } } />
                  
                <Input className='input' placeholder='*Telefon' responsive='true' regExp='^[0-9|+]*$' type='text' id='Telefon' ref='Telefon' onKeyUp={value => { this.setValue('Telefon', value) } } />
                </div>

                  <div style={{ marginTop: '20px' }}>
                    <h2 className="headline">Wer wurde geschädigt?</h2>
                <Input className='input' placeholder='*Vorname' responsive='true' type='text' id='VornameGeschädigter' ref='VornameGeschädigter' onKeyUp={value => { this.setValue('VornameGeschädigter', value) } } />
                <Input className='input' placeholder='*Nachname' responsive='true' type='text' id='NachnameGeschädigter' ref='NachnameGeschädigter' onKeyUp={value => { this.setValue('NachnameGeschädigter', value) } } />
                <Input className='input' placeholder='*Wo ist der Schaden entstanden?' responsive='true' type='text' id='Ort' ref='Ort' onKeyUp={value => { this.setValue('Ort', value) } } />
                </div>


                    <div style={{ marginTop: '20px' }}>
                    <h2 className="headline">Was ist passiert?</h2>
                <Input className='input' type='text' placeholder='*Wann ist es passiert? (tt.mm.jjjj)' responsive='true' regExp="^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$" id='Datum' ref='Datum' onKeyUp={value => { this.setValue('Datum', value) } } />
                <label htmlFor='Datum'>*Beschreibung
                    <Textarea autogrow placeholder='Bitte beschreiben sie möglichst ausführlich' onKeyUp={value => { this.setValue('Anmerkung', value.target.value) } } /></label>
                          <div className='table'>
                            <div className='table__row'>
                                <div className='table__cell'>
                                    <span>
                                        <input type='radio' className='radio' name='rbutton' ref='r1' value='KFZ' id='radio1w47653' onClick={() => { this.valueRadio() } }  />
                                        <label htmlFor='radio1w47653'>
                                            <div className='input0'  >KFZ
                    </div>
                                        </label>
                                    </span>
                                </div><div className='table__cell'>
                                    <span>
                                        <input type='radio' className='radio' name='rbutton' ref='r2' value='Hausrat' id='radio2w47653' onClick={() => { this.valueRadio() } } />
                                        <label htmlFor='radio2w47653'>
                                            <div className='input1' name='fehler' >Hausrat
                    </div>
                                        </label>
                                    </span>
                                </div>
                            </div>
                            <div className='table__row'>
                                <div className='table__cell'>
                                    <span>
                                        <input type='radio' className='radio' name='rbutton' ref='r4' value='Sonstiges' id='radio4w47653' onClick={() => { this.valueRadio() } } defaultChecked/>
                                        <label htmlFor='radio4w47653'>
                                            <div className='input3' >Sonstiger Schaden
                    </div></label></span></div></div></div>
                  </div>
                    <div className='hidden' style={{ marginTop: '20px' }} ref={ref => { this._hidden = ref; } }>
                    <h2 className="headline">KFZ Schaden</h2>
                <Input className='input' responsive='true' placeholder='Fabrikat und Typ (z.B. VW Passat)' responsive='true' type='text' id='Fabrikat' ref='Fabrikat' onKeyUp={value => { this.setValue('Fabrikat', value) } } />
                <Input className='input' responsive='true' placeholder='Kennzeichen des geschädigten' type='text' id='Kennzeichen' ref='Kennzeichen' onKeyUp={value => { this.setValue('Kennzeichen', value) } } />
                <Input className='input' responsive='true' placeholder='Art des Schadens(z.B. Frontschaden)' type='text' id='Schadensart' ref='Schadensart' onKeyUp={value => { this.setValue('Schadensart', value) } } />
                        Wer trägt die Schuld?
                        <div style={{ float: 'right' }}>
                            <SelectButton
                                label='bitte treffen Sie eine Auswahl'
                                list={osList}
                                onSelect={(value) => { this.setValue('Schuld', value ? value[0] : null) } }
                                listKey='id'
                                listValue='name'
                            />
                        </div>
                <Checkbox id='Unfallaufgenommen' label='ja, die Polizei hat den Unfall aufgenommen' ref='Unfallaufgenommen' onChange={value => { this.setValue('Unfallaufgenommen', value) } } />
                <Checkbox id='Wildunfall' label='ja, es war ein Wildunfall' ref='Wildunfall'onChange={value => { this.setValue('Wildunfall', value) } } />


                    </div>
                    


                </div>

                { /** submit button calling the validate function */}
                <div style={{ width: '100%', textAlign: 'center', marginTop: '20px', display: this.props.hideButton ? 'none' : 'inherit' }}>
                    <div ref={ref => { this._submit = ref; } } className="button button--disabled" onClick={() => { this.onSubmit() } }>
                        Submit
                    </div>
                </div>
            </div>
        );
    }
}