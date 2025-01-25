function ls --description 'ls but eza'
    if test (count $argv) -gt 0
        if type -q eza
            eza --long --all --git
        else
            ls $argv
        end
    end
end
