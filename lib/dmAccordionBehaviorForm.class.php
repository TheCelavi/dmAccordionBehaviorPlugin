<?php
/**
 * @author TheCelavi
 */
class dmAccordionBehaviorForm extends dmBehaviorBaseForm {
    
    protected $animation = array(        
        'slide'=>'Slide down',
        'show' => 'Slide corner',
        'fade'=>'Fade',
        'none'=>'None'
    );
    
    protected $event = array(
        'click_open_close'=>'Mouse click opens/close',
        'click_open_only' => 'Mouse click opens only',
        'mouseover'=>'Mouse over opens only'
    );
    
    protected $theme = array(
        'dark' => 'Dark',
        'light' => 'Light'
    );


    public function configure() {
        
        $this->widgetSchema['inner_target'] = new sfWidgetFormInputText();
        $this->validatorSchema['inner_target'] = new sfValidatorString(array(
            'required' => false
        ));
        
        $this->widgetSchema['theme'] = new sfWidgetFormChoice(array(
            'choices'=> $this->getI18n()->translateArray($this->theme)
        ));
        $this->validatorSchema['theme'] = new sfValidatorChoice(array(
            'choices'=>  array_keys($this->theme)
        )); 
                
        $this->widgetSchema['event'] = new sfWidgetFormChoice(array(
            'choices'=>$this->getI18n()->translateArray($this->event)
        ));
        $this->validatorSchema['event'] = new sfValidatorChoice(array(
            'choices'=>  array_keys($this->event)
        ));
        
        $this->widgetSchema['colapsable'] = new sfWidgetFormInputCheckbox();
        $this->validatorSchema['colapsable'] = new sfValidatorBoolean(); 
        
        $this->widgetSchema['initialy_open_index'] = new sfWidgetFormInputText();
        $this->validatorSchema['initialy_open_index'] = new sfValidatorString(array(
            'required' => false
        ));
        
        $this->widgetSchema['animation'] = new sfWidgetFormChoice(array(
            'choices'=> $this->getI18n()->translateArray($this->animation)
        ));
        $this->validatorSchema['animation'] = new sfValidatorChoice(array(
            'choices'=>  array_keys($this->animation)
        ));
        
        $this->widgetSchema['duration'] = new sfWidgetFormInputText();
        $this->validatorSchema['duration'] = new sfValidatorInteger(array(
            'min'=>0
        )); 
        
        $this->widgetSchema['easing'] = new dmWidgetFormChoiceEasing();
        $this->validatorSchema['easing'] = new dmValidatorChoiceEasing(array(
            'required' => true
        ));
        
        $this->getWidgetSchema()->setLabels(array(
            'initialy_open_index' => 'Initialy open'
        ));
        
        $this->getWidgetSchema()->setHelps(array(            
            'duration' => 'Duration of the animation in ms',
            'colapsable' => 'Opening one tab will close others',
            'initialy_open_index' => 'Enter index of initialy opened tab(s) separated with semicolon (;), or nothing for all to be closed.'
        ));
        if (is_null($this->getDefault('initialy_open_index'))) $this->setDefault ('initialy_open_index', '1');
        if (is_null($this->getDefault('colapsable'))) $this->setDefault ('colapsable', true);
        if (is_null($this->getDefault('theme'))) $this->setDefault ('theme', 'dark');
        if (is_null($this->getDefault('event'))) $this->setDefault ('event', 'click_open_close');
        if (is_null($this->getDefault('animation'))) $this->setDefault ('animation', 'slide');
        if (is_null($this->getDefault('easing'))) $this->setDefault ('easing', 'jswing');
        if (is_null($this->getDefault('duration'))) $this->setDefault ('duration', 500);
        
        
        parent::configure();
    }
    
}

