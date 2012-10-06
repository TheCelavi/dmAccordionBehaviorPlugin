<?php
/**
 * @author TheCelavi
 */
class dmAccordionBehaviorView extends dmBehaviorBaseView {
    
    public function configure() {
        $this->addRequiredVar(array('initialy_open_index','theme', 'event', 'animation', 'duration', 'easing'));
    }

    protected function filterBehaviorVars(array $vars = array()) {
        $vars = parent::filterBehaviorVars($vars); 
        if (trim($vars['initialy_open_index']) == "") {
            $vars['initialy_open_index'] = null;
        } elseif (strpos($vars['initialy_open_index'], ';')) {            
            $tmp = explode(';', $vars['initialy_open_index']);
            $vars['initialy_open_index'] = array();
            foreach ($tmp as $t) {
                $vars['initialy_open_index'][] = trim($t);
            }
        } else {
            $vars['initialy_open_index'] = array($vars['initialy_open_index']);
        }
        $vars['colapsable'] = ($vars['colapsable']) ? true : false;
        $vars['colapsable'] = intval($vars['colapsable']);
        return $vars;
    }
    
    public function getJavascripts() {
        return array_merge(
            parent::getJavascripts(),            
            array(
                'lib.easing',                
                'dmAccordionBehaviorPlugin.launch'
            )
        );
    } 
    
    public function getStylesheets() {
        return array_merge(
            parent::getStylesheets(),
            array(
                'dmAccordionBehaviorPlugin.themes'
            )
        );
    }
}

